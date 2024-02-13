import { useFormik } from "formik";
import { loginValidate } from "../../utils/validateLogin";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../context/context";
import { useContext, useState } from "react";
import Toast from "../../components/Toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      // signing in the userx x x 
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigate("/"))
        .catch((error) => {
          setIsSubmitting(false);
          const { message: jsonString } = error;
          const {
            error: { message: errorMessage },
          } = JSON.parse(jsonString);

          toast.error(errorMessage, {
            toastStyle: {
              background: "red",
              color: "white",
              minWidth: "300px",
            },
            position: "top-center",
          });
        });
    },
  });

  const style =
    "shadow-sm  border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white";

  return (
    <div className="flex flex-col  justify-center items-center h-screen bg-slate-50">
      <Toast />
      <div className="p-7 pb-2 bg-white shadow-lg rounded-lg">
        <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
          <div className="mb-5 ml-16">
            <img
              className="w-28"
              src="https://seeklogo.com/images/O/olx-logo-20F1656D13-seeklogo.com.png"
              alt="OLX image"
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              name="email"
              className={style}
              placeholder="jhonedoe@gmail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-sm font-medium text-red-700">
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={style}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-sm font-medium text-red-700">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="text-white border-2 bg-center border-black mb-2 bg-black hover:bg-white hover:text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-24 py-2.5 text-center"
            disabled={isSubmitting}
          >
            Login
          </button>
          <div className="flex items-start mb-5">
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-500"
            >
              Don't have an Account ?
              <Link to={"/signUp"} className="text-black hover:underline ml-1">
                Register
              </Link>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
