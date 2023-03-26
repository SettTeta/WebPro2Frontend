import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import axios from 'axios'

import logoImage from '/public/logo.png'
import homeImage from '/public/icon-home.png'
import scheduleImage from '/public/icon-schedule.png'
import courseImage from '/public/icon-course.png'
import gradeImage from '/public/icon-grad.svg'
import logoutImage from '/public/icon-logout.svg'
import avatarImage from '/public/avatar.png'


export default function Home({ student }) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('https://web-pro2-backend.vercel.app/api/hub/courses')
            .then(response => setCourses(response.data))
            .catch(error => console.log(error))
    }, [])



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
                            <Link href={`/${student._id}`} className="nav-link " aria-current="page">
                                <div className="icon">
                                    <Image src={homeImage} alt="home" style={{ maxHeight: "24px" }} />
                                </div>
                                <div className="label">
                                    Home
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item pb-3 pt-3">
                            <Link href={`/${student._id}/schedule`} className="nav-link active">
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
                    <header className="py-3 mb-3 border-bottom">
                        <div className="container-fluid d-grid gap-3" style={{ justifyContent: "end" }}>
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

                    <div className="container-fluid pt-3">
                        <h3>My Schedule</h3>

                        <div id='calendar'>
                            <table>
                                <thead>
                                    <tr>
                                        <td style={{ width: "40p" }}>Week</td>
                                        <td>Sun</td>
                                        <td>Mon</td>
                                        <td>Tue</td>
                                        <td>Wed</td>
                                        <td>Thu</td>
                                        <td>Fri</td>
                                        <td>Sat</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>09:00</td>
                                        <td></td>
                                        <td>
                                            <div className="event">
                                                English Class <br />
                                                BG1000 (SM 111)
                                                <span>09:00 - 10:20</span>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td>12:00</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>13:00</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td>16:00</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                </tbody>

                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course._id}>
                                            <td>{course.startTime}</td>
                                            <td>{course.days.includes('Sun') && (
                                                <div className="event">
                                                    {course.title} <br />
                                                    {course.location}
                                                    <span>{course.startTime} - {course.endTime}</span>
                                                </div>
                                            )}</td>
                                            <td>{course.days.includes('Mon') && (
                                                <div className="event">
                                                    {course.title} <br />
                                                    {course.location}
                                                    <span>{course.startTime} - {course.endTime}</span>
                                                </div>
                                            )}</td>
                                            <td>{course.days.includes('Tue') && (
                                                <div className="event">
                                                    {course.title} <br />
                                                    {course.location}
                                                    <span>{course.startTime} - {course.endTime}</span>
                                                </div>
                                            )}</td>
                                            <td>{course.days.includes('Wed') && (
                                                <div className="event">
                                                    {course.title} <br />
                                                    {course.location}
                                                    <span>{course.startTime} - {course.endTime}</span>
                                                </div>
                                            )}</td>
                                            <td>{course.days.includes('Thu') && (
                                                <div className="event">
                                                    {course.title} <br />
                                                    {course.location}
                                                    <span>{course.startTime} - {course.endTime}</span>
                                                </div>
                                            )}</td>
                                            <td>{course.days.includes('Fri') && (
                                                <div className="event">
                                                    {course.title} <br />
                                                    {course.location}
                                                    <span>{course.startTime} - {course.endTime}</span>
                                                </div>
                                            )}</td>
                                            <td>{course.days.includes('Sat') && (
                                                <div className="event">
                                                    {course.title} <br />
                                                    {course.location}
                                                    <span>{course.startTime} - {course.endTime}</span>
                                                </div>
                                            )}</td>
                                        </tr>
                                    ))}
                                </tbody>


                            </table>
                        </div>

                        <div className="note mt-3">
                            <h4>Instructor Details</h4>
                            <ul>
                                <li>
                                    <span className="instructor1"></span>
                                    <p style={{ paddingLeft: "15px" }}>Ajarn Dekd Weare</p>
                                </li>
                                <li>
                                    <span className="instructor2"></span>
                                    <p style={{ paddingLeft: "15px" }}>Ajarn Nok Thai</p>
                                </li>
                            </ul>
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

    const cou = await fetch(`https://web-pro2-backend.vercel.app/api/hub/courses`)
    const courses = await cou.json()

    const reg = await fetch(`https://web-pro2-backend.vercel.app/api/hub/registrations`)
    const registrations = await reg.json()

    return { props: { student, courses, registrations } }
}
