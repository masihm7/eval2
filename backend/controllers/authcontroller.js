const User = require('../models/usersmodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(201).json({ msg: 'User created' });

    } catch (err) {
        res.status(500).json({ msg: 'Internal Server error' });
    }
};



exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) return res.status(400).json({ msg: 'No user found' });

        const check = await bcrypt.compare(password, user.password);
        if (!check) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = {
            user: { email: user.email }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, payload });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server error');
    }
};
