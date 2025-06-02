import React, {  useState } from 'react'
import { User } from './type';



const Register = () => {
  // const [name, setName] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [formData, setFormData] = useState<User>({
    id: 0,
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        console.log('User registered successfully', data);
      } else {
        console.log('User registration failed', data);
      }
    } catch (error) {
      console.error('Error registering user', error);
    }
  }

    
  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input type="text" placeholder='Enter your user name' value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
        <label htmlFor="">Email</label>
        <input type="email" placeholder='Enter your email' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <label htmlFor="">Password</label>
        <input type="password" placeholder='Enter your password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
        <input type="text" placeholder='Confirm your password' />
        <button type='submit'>Register</button>
        
    </form>
  )
}

export default Register