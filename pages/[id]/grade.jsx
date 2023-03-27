import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

import logoImage from '/public/logo.png'
import homeImage from '/public/icon-home.png'
import scheduleImage from '/public/icon-schedule.png'
import courseImage from '/public/icon-course.png'
import gradeImage from '/public/icon-grad.svg'
import logoutImage from '/public/icon-logout.svg'
import avatarImage from '/public/profileIcon.webp'


export default function Home({ student, registrations, grades, courses }) {

    const GRADE_MAP = {
        'A+': 4.0,
        'A': 4.0,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3.0,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2.0,
        'C-': 1.7,
        'D+': 1.3,
        'D': 1.0,
        'F': 0.0,
    };

    var totalGPA = 0
    var totalCredits = 0


    const confirmGrade = async (data) => {
        const response = await fetch('/api/hub/grades', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.error) {
            alert("Error: " + result.error)
        } else {
            alert("Grade saved")
            window.location.reload(false)
        }
    }

    const handleScoreChange = (score, regisID) => {
        const data = {
            regisID: regisID,
            score: score
        }
        console.log(score);
        console.log(regisID);
        confirmGrade(data)
    }

    const renderGrade = (regisID) => {
        return (
            <select onChange={(e) => handleScoreChange(e.target.value, regisID)}>
                <option value="">Choose grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>
        );
    };

    return (
        <>
            <Head>
                <title>Student Hub - Grades</title>
            </Head>

            <main className="d-flex flex-nowrap">

                <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" id="sidebar" style={{ height: "100vh" }}>
                    <Link href={`/${student._id}`} className="align-items-center p-3 text-center link-dark text-decoration-none">
                        <Image src={logoImage} alt="logo" />
                    </Link>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-10">
                        <li className="nav-item pb-3 pt-3">
                            <Link href={`/${student._id}`} className="nav-link" aria-current="page">
                                <div className="icon">
                                    <Image src={homeImage} alt="home" style={{ maxHeight: "24px" }} />
                                </div>
                                <div className="label">
                                    Home
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item pb-3 pt-3">
                            <Link href={`/${student._id}/schedule`} className="nav-link">
                                <div className="icon">
                                    <Image src={scheduleImage} alt="schedule" style={{ maxHeight: "24px" }} />
                                </div>
                                <div className="label">
                                    Schedule
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item pb-3 pt-3">
                            <Link href={`/${student._id}/courses`} className="nav-link">
                                <div className="icon">
                                    <Image src={courseImage} alt="course" style={{ maxHeight: "24px" }} />
                                </div>
                                <div className="label">
                                    Courses
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item pb-3 pt-3">
                            <Link href={`/${student._id}/grade`} className="nav-link active">
                                <div className="icon">
                                    <Image src={gradeImage} alt="grade" style={{ maxHeight: "24px" }} />
                                </div>
                                <div className="label">
                                    Grade and <br />
                                    Transcription
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <div className="dropdown">
                        <Link href="/" className="nav-link pb-3 pt-3" style={{ padding: "0 20px" }}>
                            <div className="icon">
                                <Image src={logoutImage} alt="logout" style={{ maxHeight: "24px" }} />
                            </div>
                            <div className="label">
                                Log Out
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="main" style={{ width: "100vw" }} >
                    <header className="py-3 mb-3 border-bottom" >
                        <div className="container-fluid d-flex gap-3" style={{ justifyContent: "end" }} >
                            <div className="col-md-9">
                                <h3>Grades</h3>
                            </div>
                            <Link href={`/${student._id}/profile`} className="d-block link-dark text-decoration-none d-flex align-items-center">
                                <div className="avatar">
                                    <Image src={avatarImage} alt="avatar" width="55" height="55" className="rounded-circle" />
                                </div>
                                <div className="information">
                                    <strong>{student.firstName} {student.lastName}</strong><br />
                                    <span>{student.studentId}</span>
                                </div>
                            </Link>
                        </div>
                    </header>

                    <div className="container-fluid pt-3 col-md-10" >

                        <div className='box'>
                            {registrations.map(reg => reg.studentID === student._id ? (
                                <div key={reg._id} className="subject d-flex">
                                    {courses.map(course => course._id === reg.courseID ? (
                                        <div className="title_subject align-items-center" key={course._id}>{course.code} <br /> {course.title} </div>
                                    ) : null)}

                                    {(() => {
                                        for (let i = 0; i < grades.length; i++) {
                                            const gra = grades[i];
                                            if (reg._id === gra.regisID) {
                                                totalGPA += GRADE_MAP[gra.score]
                                                totalCredits += 1
                                                return (
                                                    <div className="grade ml-auto" key={gra._id}>{gra.score}</div>
                                                );
                                            }
                                        }
                                        return (
                                            <div className="grade ml-auto" key={`no-${reg._id}`}>
                                                {renderGrade(reg._id)}
                                            </div>
                                        );
                                    })()}
                                </div>
                            ) : null)}
                        </div>

                        <h4>GPA: {(totalGPA / totalCredits).toFixed(2)}</h4>

                    </div>

                </div>
            </main>

        </>
    )
}

export async function getServerSideProps({ params }) {
    const res = await fetch(`https://web-pro2-backend.vercel.app/api/hub/students/${params.id}`)
    const student = await res.json()

    const reg = await fetch(`https://web-pro2-backend.vercel.app/api/hub/registrations`)
    const registrations = await reg.json()

    const cou = await fetch(`https://web-pro2-backend.vercel.app/api/hub/courses`)
    const courses = await cou.json()

    const gra = await fetch(`https://web-pro2-backend.vercel.app/api/hub/grades`)
    const grades = await gra.json()

    return { props: { student, registrations, grades, courses } }

}
