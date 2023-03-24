import Head from 'next/head'
import Image from 'next/image'

import logoImage from '/public/logo.png'

export default function Home() {
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
                                            <Image src={logoImage} />
                                        </div>
                                        <h3 className="text-center mb-5" style={{ fontSize: "50px" }}>Login</h3>
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email or User ID</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div className="mb-3 form-check text-end">
                                                <a href="#" style={{ color: "#6750A4", fontSize: "12px" }}>Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-login">Login</button><br />
                                                <a href="/sign-up" style={{ color: "#6750A4", fontSize: "12px" }}>Dont have an account? Sign up.</a>
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
