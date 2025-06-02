import React, { use, useState } from 'react'



const Register = (props: Props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

    
  return (
    <form action="">
        <label htmlFor="">Name</label>
        <input type="text" placeholder='Enter your name' />
        <label htmlFor="">Email</label>
        <input type="email" placeholder='Enter your email' />
        <label htmlFor="">Password</label>
        <input type="password" placeholder='Enter your password' />
        <input type="text" placeholder='Confirm your password' />
        <button type='submit'>Register</button>
        
    </form>
  )
}

export default Register