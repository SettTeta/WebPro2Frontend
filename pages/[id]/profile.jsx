import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import logoImage from '/public/logo.png'
import homeImage from '/public/icon-home.png'
import scheduleImage from '/public/icon-schedule.png'
import courseImage from '/public/icon-course.png'
import gradeImage from '/public/icon-grad.svg'
import logoutImage from '/public/icon-logout.svg'
import avatarImage from '/public/avatar.png'


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

    return (
        <>
            <Head>
                <title>Student Hub</title>
            </Head>

            {registrations.map(reg => reg.studentID === student._id ? (
                <div key={reg._id} className="subject d-flex">
                    {(() => {
                        for (let i = 0; i < grades.length; i++) {
                            const gra = grades[i];
                            if (reg._id === gra.regisID) {
                                totalGPA += GRADE_MAP[gra.score]
                                totalCredits += 3
                            }
                        }
                    })()}
                </div>
            ) : null)}

            <main className="d-flex flex-nowrap">

                <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" id="sidebar" style={{ height: "100vh" }}>
                    <Link href="/" className="align-items-center p-3 text-center link-dark text-decoration-none">
                        <Image src={logoImage} alt="logo" />
                    </Link>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-10">
                        <li className="nav-item pb-3 pt-3">
                            <Link href={`/${student._id}`} className="nav-link active" aria-current="page">
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
                            <Link href={`/${student._id}/grade`} className="nav-link">
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

                <div className="main" style={{ width: "100vw" }}>
                    <div className="container-fluid pt-3">
                        <h3>User Profile</h3>

                        <div className="col-12 col-md-12 mt-5 ">
                            <div className="avatar-image text-center">
                                <Image src={avatarImage} alt="mdo" width="200" height="200" className="rounded-circle" />
                            </div>
                            <div className="metadata ">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td><strong>{student.firstName} {student.lastName}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Student ID</td>
                                            <td><strong>{student.studentId}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Faculty</td>
                                            <td><strong>{student.username}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td><strong>{student.email}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>GPA</td>
                                            <td><strong>{totalGPA / (totalCredits / 3)}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Credits</td>
                                            <td><strong>{totalCredits}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
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

    const gra = await fetch(`https://web-pro2-backend.vercel.app/api/hub/grades`)
    const grades = await gra.json()

    const cou = await fetch(`https://web-pro2-backend.vercel.app/api/hub/courses`)
    const courses = await cou.json()

    return { props: { student, registrations, grades, courses } }

}
