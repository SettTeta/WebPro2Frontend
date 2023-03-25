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
    return (
        <>
            <Head>
                <title>Student Hub</title>
            </Head>

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

                    <div className="container-fluid pt-3" >

                        <div className='box'>
                            {registrations.map(reg => reg.studentID === student._id ? (
                                <>
                                    <div className="subject d-flex">
                                        {courses.map(course => course._id === reg.courseID ? (
                                            <div className="title_subject align-items-center" key={course._id}>{course.code} <br /> {course.title} </div>

                                        ) : null)}
                                        {grades.map(gra => gra.regisID === reg._id ? (
                                            <div className="grade ml-auto" key={gra._id}>{gra.score}</div>
                                        ) : null)}
                                    </div>
                                </>
                            ) : null)}
                        </div>


                        <div className='box'>
                            {registrations.map(reg => reg.studentID === student._id ? (
                                <div key={reg._id}>{reg.studentID} {reg.courseID}</div>
                            ) : null)}
                        </div>

                        <div className="col-12 col-md-12 mt-5" >
                            <div className="box">
                                <div className="title">Semester 2/2020</div>
                                <div className="subject d-flex">
                                    <div className="title_subject align-items-center">
                                        BG1400 <br />
                                        BUSINESS LAW I
                                    </div>
                                    <div className="grade ml-auto">
                                        A+
                                    </div>
                                </div>
                                <div className="subject d-flex">
                                    <div className="title_subject align-items-center">
                                        BG1400 <br />
                                        BUSINESS LAW I
                                    </div>
                                    <div className="grade ml-auto">
                                        A+
                                    </div>
                                </div>
                                <div className="subject d-flex">
                                    <div className="title_subject align-items-center">
                                        BG1400 <br />
                                        BUSINESS LAW I
                                    </div>
                                    <div className="grade ml-auto">
                                        A+
                                    </div>
                                </div>
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