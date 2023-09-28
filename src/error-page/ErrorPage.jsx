import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center space-y-4">
            <h1>Something went wrong</h1>
            <Link to={`/`}></Link><button>Go to home</button>
        </div>
    );
};

export default ErrorPage;