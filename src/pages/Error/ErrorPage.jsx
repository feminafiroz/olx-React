import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mx-3">
      <div className="bg-white p-8  rounded-lg shadow-md max-w-md w-full text-center ">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-gray-700 mb-4">Page not found</p>
        <p className="text-gray-500">
          The page you are looking for might be in another castle.
        </p>
        <Link to="/" className="text-blue-500 hover:underline mt-4">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
