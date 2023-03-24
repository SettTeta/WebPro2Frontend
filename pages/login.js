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
                            <Link href="/" className="nav-link active" aria-current="page">
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
                    <header className="py-3 mb-3 border-bottom">
                        <div>Home</div>
                        <div className="container-fluid d-grid gap-3" style={{ justifyContent: "end" }}>
                            <Link href="/profile" className="d-block link-dark text-decoration-none d-flex align-items-center">
                                <div className="avatar">
                                    <Image src={avatarImage} alt="avatar" width="55" height="55" className="rounded-circle" />
                                </div>
                                <div className="information">
                                    <strong>Lion likerabbit</strong><br />
                                    <span>6974103</span>
                                </div>
                            </Link>
                        </div>
                    </header>

                    <main className="d-flex flex-nowrap">
                        <div className="d-flex flex-column flex-shrink-0 p-3" id="sidebar">
                            <a href="/" className="align-items-center p-3 text-center link-dark text-decoration-none">
                                <img src="images/logo.png"/>
                            </a>
                        </div>
                        <div className="main d-flex align-items-center">
                            <div className="container-fluid">
                                <div className="col-12 col-md-3 " style={{margin: "0 auto"}}>
                                    <div className="form-login">
                                        <h3 className="text-center mb-5" style={{fontSize: "50px"}}>Login</h3>
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email or User ID</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1"/>
                                            </div>
                                            <div className="mb-3 form-check text-end">
                                                <a href="#" style={{color: "#6750A4", fontSize: "12px"}}>Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-login">Login</button><br />
                                                <a href="/sign-up" style={{color: "#6750A4", fontSize: "12px"}}>Dont have an account? Sign up.</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                </div>
            </main>

        </>
    )
}
