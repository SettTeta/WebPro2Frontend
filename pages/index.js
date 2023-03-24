import Head from 'next/head'
import logoutIcon from '../public/logo.png'


export default function Home() {
  return (
    <>
      <Head>
        <title>Student Hub</title>
      </Head>

      <main class="d-flex flex-nowrap">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" id="sidebar">
          <a href="/" class="align-items-center p-3 text-center link-dark text-decoration-none">
            <img src="images/logo.png"/>
          </a>
          <hr />
          <ul class="nav nav-pills flex-column mb-10">
            <li class="nav-item pb-3 pt-3">
              <a href="/" class="nav-link active" aria-current="page">
                <div class="icon">
                  <img src="images/icon-home.svg" style={{maxHeight: "24px"}} />
                </div>
                <div class="label">
                  Home
                </div>
              </a>
            </li>
            <li class="nav-item pb-3 pt-3">
              <a href="/schedule.html" class="nav-link">
                <div class="icon">
                  <img src="images/icon-schedule.svg" style={{maxHeight: "24px"}} />
                </div>
                <div class="label">
                  Schedule
                </div>
              </a>
            </li>
            <li class="nav-item pb-3 pt-3">
              <a href="/courses.html" class="nav-link">
                <div class="icon">
                  <img src="images/icon-course.svg" style={{maxHeight: "24px"}} />
                </div>
                <div class="label">
                  Courses
                </div>
              </a>
            </li>
            <li class="nav-item pb-3 pt-3">
              <a href="/grade.html" class="nav-link">
                <div class="icon">
                  <img src="images/icon-grad.svg" style={{maxHeight: "24px"}} />
                </div>
                <div class="label">
                  Grade and <br />
                  Transcription
                </div>
              </a>
            </li>
          </ul>
          <hr />
          <div class="dropdown">
            <a href="#" class="nav-link pb-3 pt-3" style={{padding: "0 20px"}}>
              <div class="icon">
                <img src={logoutIcon} style={{maxHeight: "24px"}} />
              </div>
              <div class="label">
                Log Out
              </div>
            </a>
          </div>
        </div>
        <div class="main">
          <header class="py-3 mb-3 border-bottom">
            <div class="container-fluid d-grid gap-3 align-items-center">
              <div class="d-flex align-items-center ml-auto">
                <div class="flex-shrink-0 dropdown">
                  <a href="/profile.html" class="d-block link-dark text-decoration-none d-flex align-items-center">
                    <div class="avatar">
                      <img src="images/avatar.png" alt="mdo" width="55" height="55" class="rounded-circle" />
                    </div>
                    <div class="information">
                      <strong>Lion likerabbit</strong><br />
                      <span>6974103</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </header>
        </div>
      </main>

    </>
  )
}
