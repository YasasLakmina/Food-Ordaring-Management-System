import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import FullScreenAlert from "../common/FullScreenAlert";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/restaurant/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Start login process
      dispatch(loginStart());

      const response = await fetch(
        "http://localhost:5000/api/auth/resturentLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Login successful
      dispatch(
        loginSuccess({
          token: data.token,
          user: data.restaurant,
        })
      );

      setAlertMessage("Login successful! Redirecting to your dashboard...");
      setShowAlert(true);

      // Redirect will happen through FullScreenAlert
    } catch (err) {
      let errorMessage = "Failed to login";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      dispatch(loginFailure(errorMessage));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {showAlert && (
        <FullScreenAlert
          type="success"
          title="Login Successful"
          message={alertMessage}
          redirectPath="/restaurant/dashboard"
          redirectDelay={2000}
          onClose={() => setShowAlert(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-gray-600 hover:text-gray-500"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
