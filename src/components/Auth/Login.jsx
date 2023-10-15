import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/features/authSlice";
import { Button, Input, Logo } from "../index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);

  const login = async (data) => {
    setError("");
    setLoader(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <section>
      {error && <Toaster position="top-center" reverseOrder={false} />}
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md  p-6 rounded-lg border-2 border-gray-800 ">
          <div className="mb-2 flex justify-center">
            <Logo />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&#x27;t have an account?
            <Link
              to="/signup"
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create an account
            </Link>
          </p>
          {/* {error && <p className="text-red-800 text-center my-2">{error}</p>} */}
          <form method="POST" onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              {/* Input will go Here */}
              <Input
                label="Email: "
                type="email"
                placeholder="Enter your email..."
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />

              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />

              <div className="space-y-3">
                <Button className="w-full hover:bg-blue-700" type="submit">
                  {loader && authStatus === false ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
