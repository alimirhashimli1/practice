import React, { useState } from 'react';
import { UserLogin } from './type';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState<UserLogin>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('User logged in successfully');
        console.log('User logged in successfully', data);
        navigate('/home');
      } else {
        console.log('User login failed', data);
        setError('User login failed');
      }
    } catch (error) {
      console.error('Error logging in user', error);
      setError('Error logging in user');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Login an Account</h2>
    <h1>this is a header</h1>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center">{success}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </form>
  );
}

export default Login;
