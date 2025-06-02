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

module.exports = { registerUser, loginUser, getAllUsers };