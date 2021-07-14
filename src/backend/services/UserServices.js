// services for user
const axios = require('axios');
const mongoose = require('mongoose');
const User = require('../models/UserSchema');

const firebaseAPIKey = 'AIzaSyDaKTAclgtccZACOapwTXYEudrvGfqNrGs';

// Request Body Format
// {
//  "name": "name",
//  "email": "test@test.com",
//  "password": "abc123",
// }
// Response Format
// {
//     status: 400/500
//     message: [
//                 'Invalid request body',
//                 'INVALID_EMAIL',
//                 'EMAIL_EXISTS',
//                 'WEAK_PASSWORD : Password should be at least 6 characters',
//                 'Firebase Server Error',
//                 'Sign Up successful Database error'
//              ]
// }
// {
//     status: 200,
//     idToken: firebaseResponse.data.idToken,
//     refreshToken: firebaseResponse.data.refreshToken,
//     expiresIn: firebaseResponse.data.expiresIn,
//     userData: {
//         name: name,
//         email: email,
//         _id: firebaseResponse.data.localId,
//         "likes": [],
//         "collections": []
//         "__v": 0
//     }
// }
const signUpService = async (req, res) => {

    const { email, password, name } = req.body;

    let firebaseResponse = {};
    let response = {};

    if(!email || !password || !name) {
        return res.status(400).json({status:400, message:"Invalid request body"});
    }

    // Step One: Firebase
    try {
        firebaseResponse = await axios.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
            {
                email: email,
                password: password,
                returnSecureToken: true
            },
            {
                params: { key: firebaseAPIKey },
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (firebaseErr) {
        if (firebaseErr.response.data.error.message) {
            response = {
                status: 400,
                message: firebaseErr.response.data.error.message
            };
            return res.status(400).json(response);
        }
        return res.status(500).json({ status: 500, message: "Firebase Server Error" });
    }

    // Step Two: our database
    const newUser = new User({
        name,
        email,
        _id: firebaseResponse.data.localId
    });
    try {
        await newUser.save();
    } catch (err) {
        return res.status(500).json({ status: 500, message: "Sign Up successful Database error" });
    }

    response = {
        status: 200,
        idToken: firebaseResponse.data.idToken,
        refreshToken: firebaseResponse.data.refreshToken,
        expiresIn: firebaseResponse.data.expiresIn,
        userData: newUser
    };
    return res.status(200).json(response);
}

// Request Body Format
// {
//  "email": "test@test.com",
//  "password": "abc123",
// }
// Response Format
// {
//     status: 400/500
//     message: [
//                 'Invalid request body',
//                 'INVALID_EMAIL',
//                 'EMAIL_NOT_FOUND',
//                 'INVALID_PASSWORD',
//                 'Firebase Server Error',
//                 'Database Error'
//              ]
// }
// {
//     status: 200,
//     idToken: firebaseResponse.data.idToken,
//     refreshToken: firebaseResponse.data.refreshToken,
//     expiresIn: firebaseResponse.data.expiresIn,
//     userData: {
//         name: name,
//         email: email,
//         _id: firebaseResponse.data.localId
//         "likes": [aaa,bbb,ccc],
//         "collections": [aaa,bbb,ccc],
//         "__v": 0
//     }
// }
const loginService = async (req, res) => {

    const { email, password } = req.body;

    let firebaseResponse = {};
    let response = {};

    if(!email || !password) {
        return res.status(400).json({status:400, message:"Invalid request body"});
    }

    // Step One: Verify in Firebase
    try {
        firebaseResponse = await axios.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
            {
                email: email,
                password: password,
                returnSecureToken: true
            },
            {
                params: { key: firebaseAPIKey },
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (firebaseErr) {
        if (firebaseErr.response.data.error.message) {
            response = {
                status: 400,
                message: firebaseErr.response.data.error.message
            };
            return res.status(400).json(response);
        }
        return res.status(500).json({ status: 500, message: "Firebase Server Error" });
    }

    // Step Two: Verify in our database
    let foundUser;
    try {
        foundUser = await User.findById(firebaseResponse.data.localId);
        // email already signed up with firebase, not yet synced into our own DB.
        if (!foundUser) {
            const newUser = new User({
                name: "Please update your name",
                email,
                _id: firebaseResponse.data.localId
            });
            await newUser.save();
            foundUser = newUser;
        }
    } catch (err) {
        return res.status(500).json({ status: 500, message: "Database Error" });
    }

    response = {
        status: 200,
        idToken: firebaseResponse.data.idToken,
        refreshToken: firebaseResponse.data.refreshToken,
        expiresIn: firebaseResponse.data.expiresIn,
        userData: foundUser
    };
    return res.status(200).json(response);
}

exports.signUpService = signUpService;
exports.loginService = loginService;