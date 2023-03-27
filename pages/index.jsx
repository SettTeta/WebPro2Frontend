import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import logoImage from '/public/logo.png'

export default function Home({ students }) {
  const router = useRouter()

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const email = event.target.elements.email.value
    const password = event.target.elements.password.value

    const matchedStudent = students.find((student) => {
      return student.email === email && student.password === password
    })

    if (matchedStudent) {
      router.push(`/${matchedStudent._id}`)
    } else {
      alert('Invalid email or password')
    }
  }

  return (
    <>
      <Head>
        <title>Student Hub - Login</title>
      </Head>

      <main className="d-flex flex-nowrap">
        <div className="main" style={{ width: "100vw" }}>
          <main className="d-flex flex-nowrap">
            <div className="main d-flex align-items-center">
              <div className="container-fluid">
                <div className="col-12 col-md-3 " style={{ margin: "0 auto" }}>
                  <div className="form-login">
                    <div className="align-items-center p-3 text-center link-dark text-decoration-none">
                      <Image src={logoImage} alt="logo"/>
                    </div>
                    <h3 className="text-center mb-5" style={{ fontSize: "50px" }}>Login</h3>
                    <form onSubmit={handleLoginSubmit}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email or User ID</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" required />
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-login">Login</button><br />
                        <Link href="/signup" style={{ color: "#6750A4", fontSize: "12px" }}>Dont have an account? Sign up.</Link>
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

export async function getServerSideProps() {
  const res = await fetch(`https://web-pro2-backend.vercel.app/api/hub/students`)
  const students = await res.json()

  return { props: { students } }
}