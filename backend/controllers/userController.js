const express = require('express');
const { User } = require('../models');


 const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const newUser = await User.create({ username, email, password });
      res.status(200).json(newUser);
    }
  } catch (error) {
      console.error('Register Error:', error); 
    res.status(500).json({ error: 'Failed to register user' });
  }
};


 const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.status(200).json({ message: 'Login successful', user });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Get Users error', error);
    rest.status(500).json({error: 'Failed to get users'})
  }
}

const getUser = async (req, res) => {
  try {
    const { id} = req. params;
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    console.error('Get User error', error);
    res.status(500).json({error: 'Failed to get user'})
  }
}


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({ where: { id}});
    if(deletedUser) {
      res.status(200).json({ message: "User deleted successfully", deletedUser});
    } else {
      res.status(404).json({ message: "User not found"});
    }
  } catch (error) {
    console.log('Error deleting user', error)
    res.status(500).json({error: 'Failed to delete user'});
  }
}

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const updatedUser = await User.findByPk( id )
    if(!updatedUser){
      return res.status(404).json({error: "User not found"});
    }
    if(username) updatedUser.username = username;
    if(email) updatedUser.email = email;
    if(password) {
      const salt = await bcrypt.genSalt(10);
      updatedUser.password = await bcrypt.hash(password, salt);
    }

    await updatedUser.save();
    res.status(200).json({message: "User updated successfully", updatedUser: {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
    }});
  } catch (error) {
    res.status(500).json({error: "Failed to update user"})
  }
}


module.exports = { registerUser, loginUser, getAllUsers, getUser, deleteUser };