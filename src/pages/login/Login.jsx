import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import auth from "../../firebase/firebase.config";
import Update from "../../components/update/Update";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [loginError, setLoginError] = useState(``);
    const [success, setSuccess] = useState(false);
    const [passVisible, setPassVisible] = useState(false);
    const emailRef = useRef(``);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e.target.email.value, e.target.password.value);
        setEmail(e.target.email.value);
        setPassword(e.target.password.value)
        setLoginError(``);
        setSuccess(``);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                if(!userCredential.user.emailVerified){
                    setSuccess(``);
                    setLoginError(`Please verify your email`)
                }else{
                    setLoginError(``);
                    setSuccess(`Logged in sucessfully`)
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setLoginError(errorMessage);
            });
    }

    const handleForgotPassword = e => {
        // console.log(`password forgotten`);
        setEmail(emailRef.current.value);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert(`Please check your email`);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
    return (
        <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100 m-auto">
            <Update registratiionError={loginError} success={success}></Update>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input ref={emailRef} type="email" name="email" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={passVisible ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a onClick={handleForgotPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        <section onClick={() => setPassVisible(!passVisible)} className="absolute right-2 top-12 text-xl">
                            {
                                passVisible ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>
                            }
                        </section>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
            <Link to={`/register`}><p>New User? Please Create an account first</p></Link>
        </div>
    );
};

export default Login;