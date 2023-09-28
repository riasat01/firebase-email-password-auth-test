import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e.target.email.value, e.target.password.value);
        setEmail(e.target.email.value);
        setPassword(e.target.password.value)
    }
    return (
        <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100 m-auto">
            <div className="card-body">
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
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;