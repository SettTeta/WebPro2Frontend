import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import logoImage from '/public/logo.png'


export default function Home() {
    return (
        <>
            <Head>
                <title>Student Hub</title>
            </Head>

                

                <main className="d-flex flex-nowrap">
                    <div className="d-flex flex-column flex-shrink-0 p-3" id="sidebar">
                        <Link href="/" className="align-items-center p-3 text-center link-dark text-decoration-none">
                            <Image src={logoImage} alt="logo"/>
                        </Link>
                    </div>
                    <div className="main d-flex align-items-center">
                        <div className="container-fluid">
                            <div className="col-12 col-md-3 " style={{margin: "0 auto"}}>
                                <div className="form-login">
                                    <h3 className="text-center mb-5" style={{fontSize: "50px"}}>SIGN UP</h3>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="u6147255@Au.edu" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="userId" className="form-label">User ID</label>
                                            <input type="text" className="form-control" id="userId" aria-describedby="emailHelp" placeholder="Webdevlikeya" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password1" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password1" placeholder="Password" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password2" className="form-label">Password Confirm</label>
                                            <input type="password" className="form-control" id="password2" placeholder="Password Confirm" />
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
