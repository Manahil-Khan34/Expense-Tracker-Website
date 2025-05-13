const User = require('../models/User.js');

const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    };
    

    //user registration
    exports.registerUser = async (req, res) => {
        
    const { fulName, email, password, profileImageUrl} = req.body;

    //validiation : check for missing fields
    if (!fulName || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    };

    try{
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        };

        //create new user
        const user = await User.create({
            fulName,
            email,
            password,
        profileImageUrl
        });

        res.status(201).json({
            
            _id: user._id,
            user ,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user' , error: err.message });
    }
}; 

     //user login
     exports.loginUser = async (req, res) => {

        const { email, password } = req.body;

        //validiation : check for missing fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        };

        try{
            //check if user exists
            const user = await User.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
                return res.status(400).json({ message: 'Invalid credentials' });
            };

           

            res.status(200).json({
                _id: user._id,
                user,
                token: generateToken(user._id),
            });
        } catch (err) {
            res.status(500).json({ message: 'Error logging in user' , error: err.message });
        }
     };

      //get user info
    exports.getUserInfo = async (req, res) => {
        try {
            const user = await User.findById(req.user._id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json({ message: 'Error fetching user info' , error: err.message });
        }
    };