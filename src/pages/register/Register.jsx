import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import auth from "../../firebase/firebase.config";
import Update from "../../components/update/Update";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [registratiionError, setRegistrationError] = useState(``);
    const [success, setSuccess] = useState(``);
    const [passVisible, setPassVisible] = useState(false);
    const [name, setName] = useState(``);

    const handleSubmit = e => {
        e.preventDefault();
        setName(e.target.name.value);
        console.log(e.target.email.value, e.target.password.value);
        setEmail(e.target.email.value);
        setPassword(e.target.password.value);
        setRegistrationError(``);



        if (password.length < 6) {
            setRegistrationError(`Password must be at least 6 characterlong!`);
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegistrationError(`Password must contain at least one capital letter`);
            return;
        } else if (!/[a-z]/.test(password)) {
            setRegistrationError(`Password must contain at least one small letter`);
            return;
        } else if (!/[!,@,#,%,^,&,*]/.test(password)) {
            setRegistrationError(`Password must contain at least one of these "!,@,#,%,^,&,*" characters`);
            return;
        } else if (!e.target.radio.checked) {
            setRegistrationError(`Please checke our terms and conditions`);
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredintial => {
                console.log(userCredintial.user);

                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                    // Profile updated!
                    // ...
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        alert(`Please check your email and verify`)
                    });
                setRegistrationError(``);
                setSuccess(`Successfully registered`);
            })
            .catch(error => {
                console.log(error.message);
                setSuccess(``);
                setRegistrationError(error.message)
            })
    }


    return (
        <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100 m-auto">
            <div className="card-body">
                <Update registratiionError={registratiionError} success={success}></Update>

                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="name" name="name" placeholder="name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={passVisible ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        <section onClick={() => setPassVisible(!passVisible)} className="absolute right-2 top-12 text-xl">
                            {
                                passVisible ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>
                            }
                        </section>
                        <div className="">
                            <input type="checkbox" name="radio" id="radio" />
                            <label htmlFor="">Please except our terms and conditions</label>
                        </div>
                    </div>
                    <div className={`form-control mt-6`}>
                        <button className="btn btn-primary w-full" >Register</button>
                    </div>
                </form>
            </div>
            <Link to={`/login`}><p>Already has an accoount? Please Log in</p></Link>
        </div>
    );
};

export default Register;