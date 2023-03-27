import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import logoImage from '/public/logo.png'
import homeImage from '/public/icon-home.png'
import scheduleImage from '/public/icon-schedule.png'
import courseImage from '/public/icon-course.png'
import gradeImage from '/public/icon-grad.svg'
import logoutImage from '/public/icon-logout.svg'
import avatarImage from '/public/profileIcon.webp'


export default function Home({ student, registrations, courses }) {

  function getDayOfWeek() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    return dayOfWeek;
  }


  return (
    <>
      <Head>
        <title>Student Hub - Home</title>
      </Head>

      <main className="d-flex flex-nowrap">

        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" id="sidebar" style={{ height: "100vh" }}>
          <Link href={`/${student._id}`} className="align-items-center p-3 text-center link-dark text-decoration-none">
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
          <header className="py-3 mb-3 border-bottom" >
            <div className="container-fluid d-flex gap-3" style={{ justifyContent: "end" }} >
              <div className="col-md-9">
                <h3>Home</h3>
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

          <div className='box' style={{marginLeft:"20%", marginRight:"20%"}}>
            <h3>Today's Class - {getDayOfWeek()}</h3>
            <div className="subject">
              {registrations.map(reg => reg.studentID === student._id ? (
                courses.map(course => course._id === reg.courseID && course.date === getDayOfWeek() ? (
                  <div className="title_subject align-items-center mb-4" key={course._id}>
                    Code: {course.code} <br /> 
                    Title: {course.title}<br /> 
                    Time: {course.date}-{course.time} <br /> 
                    Instrcutor: {course.instructor}
                  </div>
                ) : null)
              ) : null)}
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

  const cou = await fetch(`https://web-pro2-backend.vercel.app/api/hub/courses`)
  const courses = await cou.json()

  return { props: { student, registrations, courses } }
}