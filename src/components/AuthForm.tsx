import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data); // TODO replace this with your authentication logic later
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        isLogin ? "bg-gray-800" : "bg-gray-900"
      }`}
    >
      <div className="w-full max-w-md px-8 py-10 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-2">
                Email is required
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300" // Text color for labels
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-xs text-red-500 mt-2">
                Password is required
              </span>
            )}
          </div>
          {!isLogin && (
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-xs text-red-500 mt-2">
                  Passwords do not match
                </span>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full px-3 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p
          className="text-sm text-center text-gray-500 mt-4 cursor-pointer hover:text-blue-800 transition-colors duration-[50000]"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
