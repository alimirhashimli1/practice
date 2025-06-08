import React, {  useState } from 'react'
import { User } from './type';
import { Link, useNavigate } from 'react-router-dom';



const Register = () => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(formData.password !== confirmPassword){
      setError('Passwords do not match');
      return;
    }

    try {
      const respone  = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const data = await respone.json();
      if(respone.ok){
        console.log('User logged successfully', data);
        setSuccess('User logged successfully');
                    navigate('/home');

      } else {
        console.log('User login failed', data);
      }
    } catch (error) {
      console.error('Error login user', error);
    }
  }

    
  return (
<form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl space-y-6"
>
  <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

  <div>
    <label className="block text-gray-700 font-medium mb-1">Username</label>
    <input
      type="text"
      placeholder="Enter your user name"
      value={formData.username}
      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

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

  <div>
    <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
    <input
      type="password"
      placeholder="Confirm your password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {error && (
    <p className="text-red-500 text-sm text-center">{error}</p>
  )}
   {success && (
    <p className="text-green-500 text-sm text-center">{success}</p>
  )}

  <button
    type="submit"
    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
  >
    Register
  </button>
    <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
</form>

  )
}

export default Register