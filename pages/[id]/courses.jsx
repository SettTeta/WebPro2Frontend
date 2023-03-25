import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import logoImage from '/public/logo.png'
import homeImage from '/public/icon-home.png'
import scheduleImage from '/public/icon-schedule.png'
import courseImage from '/public/icon-course.png'
import gradeImage from '/public/icon-grad.svg'
import logoutImage from '/public/icon-logout.svg'
import avatarImage from '/public/avatar.png'


export default function Home({ courses, student }) {
  const [registeredCourses, setRegisteredCourses] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const response = await fetch(`/api/hub/registrations/${student._id}`);
      const data = await response.json();
      setRegisteredCourses(data.map(registration => registration.courseID));
    };
    fetchRegistrations();
  }, [student._id]);

  const registerCourse = async (data) => {
    const response = await fetch('/api/hub/registrations', {
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
      alert("New account created successfully")
      window.location.reload(false);
    }
  }

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
              <Link href={`/${student._id}/courses`} className="nav-link active">
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
                <h3>Add Courses</h3>
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


          <table>
            <thead>
              <tr>
                <td>Code</td>
                <td>Title</td>
                <td>Instructor</td>
                <td>Date</td>
                <td>Time</td>
                <td>Credit</td>
                <td>Add</td>
              </tr>
            </thead>
            <tbody>
              {
                courses.map(course => {
                  const isRegistered = registeredCourses.includes(course._id);
                  return (
                    <tr key={course._id}>
                      <td>
                        {course.code}
                      </td>
                      <td>
                        {course.title}
                      </td>
                      <td>
                        {course.instructor}
                      </td>
                      <td>
                        {course.date}
                      </td>
                      <td>
                        {course.time}
                      </td>
                      <td>
                        {course.credit}
                      </td>
                      <td>
                        <button
                          disabled={isRegistered}
                          onClick={() => {
                            const data = {
                              studentID: student._id,
                              courseID: course._id,
                            };
                            registerCourse(data);
                          }}
                        >
                          {isRegistered ? 'Registered' : 'Add'}
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

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

  return { props: { courses, student } }
}