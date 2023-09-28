import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../firebase/firebase.config";
import Update from "../../components/update/Update";

const Register = () => {

    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [registratiionError, setRegistrationError] = useState(``);
    const [success, setSuccess] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e.target.email.value, e.target.password.value);
        setEmail(e.target.email.value);
        setPassword(e.target.password.value);
        setRegistrationError(``);

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredintial => {
                console.log(userCredintial.user);
                setSuccess(true);
            })
            .catch(error => {
                console.log(error.message);
                setRegistrationError(error.message)
            })
    }

   
    return (
        <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100 m-auto">
            <div className="card-body">
                {/* <Update registratiionError={ registratiionError} success={success}></Update> */}

                <div>
                    {
                        registratiionError ? <div className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{registratiionError}</span>
                        </div> : null 
                    }
                    {
                        success ? <div className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>User added successfully!</span>
                        </div> : null
                    }
                </div>


                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;