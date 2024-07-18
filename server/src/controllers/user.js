import express from 'express';
import { User } from '../models/user.js';


// create user
export const register = async (req, res) => {
    try {
        const { displayName, uid, email, steamId } = req.body;
        // console.log(displayName, uid, email, steamId);

        if(!displayName || !uid || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const userExists = await User.findOne({ userUid: uid });
        if(userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = await User.create({ username: displayName, userUid: uid, email, steamId });
        //  console.log(user);

        if(user) {
            return res.status(201).json({
                message: 'User created successfully',
                isSuccess: true,
                user
            });
        }

    } catch(error) {
        //   console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error', isSuccess: false, message: error.message, error });
    }
};


//get user
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ email: id })
        if(user) {
            return res.status(200).json({ isSuccess: true, steamId: user.steamId });
        } else {
            return res.status(404).json({ isSuccess: false, message: 'User not found' });
        }

    } catch(error) {
        res.status(500).json({ error: 'Internal server error', isSuccess: false, message: error.message, error });

    }
}

//get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(users) {
            return res.status(200).json({ isSuccess: true, users });
        }

    } catch(error) {

        res.status(500).json({ error: 'Internal server error', isSuccess: false, message: error.message, error });

    }
}

//update user
export const updateUser = async (req, res) => {
    try {
        console.log("update user toutr ran");
        const { id } = req.params;
        const { steamId, isQualified } = req.body;
        const user = await User.findOne({ email: id });
        //   console.log("user", user);
        if(user) {

            user.steamId = JSON.stringify(steamId) || user.steamId;
            user.isQualified = isQualified || user.isQualified;

            const updatedUser = await user.save();
            if(updatedUser) {
                return res.status(200).json({ isSuccess: true, message: 'User updated successfully', updatedUser });
            }
        } else {
            return res.status(404).json({ isSuccess: false, message: 'User not found' });
        }

    } catch(error) {
        res.status(500).json({ error: 'Internal server error', isSuccess: false, message: error.message, error });

    }
}

//delete user
export const deleteUser = async (req, res) => {
    res.send('delete user');
}

//get user by steamId
export const getUserBySteamId = async (req, res) => {
    res.send('get user by steamId');
}

