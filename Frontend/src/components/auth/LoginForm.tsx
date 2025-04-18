import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";

interface LoginFormProps {
  onSuccess?: () => void;
  isSignup?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  isSignup = false,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Immediate redirect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // First call onSuccess to close the modal
      if (onSuccess) {
        onSuccess();
      }

      // Redirect based on user type
      if (user?.restaurantName) {
        console.log("Redirecting to restaurant dashboard");
        navigate("/restaurant/dashboard");
      } else {
        console.log("Redirecting to home page");
        navigate("/"); // Regular users go to homepage
      }
    }
  }, [isAuthenticated, navigate, onSuccess, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // For signup, check if passwords match
    if (isSignup && formData.password !== formData.confirmPassword) {
      dispatch(loginFailure("Passwords do not match"));
      return;
    }

    try {
      dispatch(loginStart());

      const endpoint = isSignup
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/resturentLogin";

      const payload = isSignup
        ? {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            restaurantName: formData.restaurantName,
            address: formData.address,
            phone: formData.phone,
          }
        : {
            username: formData.username,
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || (isSignup ? "Registration failed" : "Login failed")
        );
      }

      // Login successful
      dispatch(
        loginSuccess({
          token: data.token,
          user: data.restaurant || data.user,
        })
      );
    } catch (err) {
      let errorMessage = isSignup ? "Failed to register" : "Failed to login";
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
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-center">
          {error}
        </div>
      )}

      {/* Username field */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
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
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
        />
      </div>

      {/* Email field - only for signup */}
      {isSignup && (
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
          />
        </div>
      )}

      {/* Password field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
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
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
        />
      </div>

      {/* Confirm Password - only for signup */}
      {isSignup && (
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
          />
        </div>
      )}

      {/* Restaurant specific fields - only for signup */}
      {isSignup && (
        <>
          <div>
            <label
              htmlFor="restaurantName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            />
          </div>
        </>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 mt-6"
      >
        {loading
          ? isSignup
            ? "Creating Account..."
            : "Signing in..."
          : isSignup
          ? "Create Account"
          : "Sign in"}
      </button>

      {/* Removed the "Forgot password" link as requested */}
    </form>
  );
};

export default LoginForm;
