const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

//Post /api/auth/register
exports.registerUser = async (req, res) => {
    const { fullname, email, phone, password, role } = req.body
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // create new user
        const newUser = new User({ fullname, email, phone, password, role });
        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
}

// POST /api/auth/login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Match password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

        // Generate token
        const token = generateToken(user);

        res.status(200).json({
            token,
            user: {
                name: user.fullname,
                role: user.role,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
