import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import logoImage from '/public/logo.png'


export default function Home() {
    const { register, handleSubmit } = useForm();

    const addStudent = async (data) => {
        const response = await fetch('https://web-pro2-backend.vercel.app/api/hub/students', {
            method: "POST",
            mode: "no-cors",
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
            window.location.href = "/"
        }
    }

    return (
        <>
            <Head>
                <title>Student Hub</title>
            </Head>

            <main className="d-flex flex-nowrap">
                <div className="main d-flex align-items-center">
                    <div className="container-fluid">
                        <div className="col-12 col-md-3 " style={{ margin: "0 auto" }}>
                            <div className="form-login">
                                <div className="align-items-center p-3 text-center link-dark text-decoration-none">
                                    <Link href="/">
                                        <Image src={logoImage} alt="logo" />
                                    </Link>
                                </div>
                                <h3 className="text-center mb-2" style={{ fontSize: "30px" }}>SIGN UP</h3>
                                <form onSubmit={handleSubmit(addStudent)}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="u6147255@Au.edu" {...register("email", { required: true })}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="userId" className="form-label">User ID</label>
                                        <input type="text" className="form-control" id="userId" aria-describedby="emailHelp" placeholder="Webdevlikeya" {...register("username", { required: true })}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="studentId" className="form-label">Student ID Number</label>
                                        <input type="text" className="form-control" id="studentId" aria-describedby="emailHelp" placeholder="6361278" {...register("studentId", { required: true })}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password1" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password1" placeholder="Password" {...register("password", { required: true })}/>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-login">Sign Up</button><br />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
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