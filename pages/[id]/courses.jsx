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
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/hub/registrations?studentID=${student._id}`);
      const data = await res.json();
      setRegistrations(data);
    };
    fetchData();
  }, [student._id]);

  const isRegistered = (courseID) => {
    return registrations.some(registration =>
      registration.courseID === courseID && registration.studentID === student._id
    );
  }

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
      alert("Registered successfully")
    }
  }

  function deleteRegistration(id) {
    const confirmed = window.confirm("Are you sure you want to delete this course from your account?");
    if (confirmed) {
      fetch(`/api/hub/registration/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
          window.location.reload(false);
        })
    }
  }

  const filteredCourses = courses.filter((course) => {
    const searchTermRegex = new RegExp(searchTerm, 'i');
    return (
      searchTermRegex.test(course.code) ||
      searchTermRegex.test(course.title) ||
      searchTermRegex.test(course.instructor) ||
      searchTermRegex.test(course.date) ||
      searchTermRegex.test(course.time)
    );
  });

  return (
    <>
      <Head>
        <title>Student Hub - Course</title>
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

          <div className="my-3">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table>
            <thead>
              <tr>
                <td>Code</td>
                <td>Title</td>
                <td>Instructor</td>
                <td>Date</td>
                <td>Time</td>
                <td>Credit</td>
                <td>Register</td>
                <td>Unregister</td>
              </tr>
            </thead>
            <tbody>
              {
                filteredCourses.map(course => {
                  // const isRegistered = registeredCourses.includes(course._id);
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
                          disabled={isRegistered(course._id)}
                          onClick={() => {
                            const data = {
                              studentID: student._id,
                              courseID: course._id,
                            };
                            registerCourse(data);
                          }}
                        >
                          {isRegistered(course._id) ? 'Registered' : 'Add'}
                        </button>
                      </td>
                      <td>
                        <button
                          disabled={!isRegistered(course._id)}
                          onClick={() => {
                            deleteRegistration(course._id);
                          }}
                        >
                          {isRegistered(course._id) ? 'Delete' : '-'}
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