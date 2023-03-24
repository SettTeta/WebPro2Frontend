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


export default function Home() {
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
                            <Link href="/" className="nav-link" aria-current="page">
                                <div className="icon">
                                    <Image src={homeImage} alt="home" style={{ maxHeight: "24px" }} />
                                </div>
                                <div className="label">
                                    Home
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item pb-3 pt-3">
                            <Link href="/schedule" className="nav-link">
                                <div className="icon">
                                    <Image src={scheduleImage} alt="schedule" style={{ maxHeight: "24px" }} />
                                </div>
                                <div className="label">
                                    Schedule
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item pb-3 pt-3">
                            <Link href="/courses" className="nav-link">
                                <div className="icon">
                                    <Image src={courseImage} alt="course" style={{ maxHeight: "24px" }} />
                                </div>
                                <div className="label">
                                    Courses
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item pb-3 pt-3">
                            <Link href="/grade" className="nav-link">
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
                        <Link href="#" className="nav-link pb-3 pt-3" style={{ padding: "0 20px" }}>
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

                        <div className="col-12 col-md-4 mt-5">
                            <div className="avatar-image text-center">
                                <Image src={avatarImage} alt="mdo" width="200" height="200" className="rounded-circle" />
                            </div>
                            <div className="metadata">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td><strong>Lion likerabbit</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Student ID</td>
                                            <td><strong>6974103</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Faculty</td>
                                            <td><strong>Science and Technology</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Department</td>
                                            <td><strong>Computer Science</strong></td>
                                        </tr>
                                        <tr>
                                            <td>GPA</td>
                                            <td><strong>4.00</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Credits</td>
                                            <td><strong>123</strong></td>
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
