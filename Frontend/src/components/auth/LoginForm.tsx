import React, { useState } from 'react';
import Button from '../Button';
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', formData);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <a href="#" className="font-medium text-gray-600 hover:text-gray-500">
            Forgot password?
          </a>
        </div>
      </div>
      <Button type="submit" variant="primary" fullWidth>
        Sign in
      </Button>
    </form>;
};
export default LoginForm;