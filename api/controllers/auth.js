const User = require("../../models/User");
const jwt = require('jwt-simple');

module.exports = {
    signup: async (req,res) => {
        try {
            const { name, email, password } = req.body;

            const foundUser = await User.findOne({ email });
            console.log('foundUser', foundUser);

            if(foundUser) return res.status(400).json({ error: 'Email is already taken' });

            const user = new User({ name, email, password })
            await user.save();

            const token = jwt.encode({
                id: user._id
            }, process.env.SECRET);

            res.status(201).cookie('Auth-token', token).json({ user, token });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },
    login: async (req,res) => {
        try {
            const { email, password } = req.body;

            const foundUser = await User.findOne({ email });
            let validPassword;

            if(foundUser) validPassword = await foundUser.isValidPassword(password);
            if(!foundUser ||  !validPassword) return res.status(401).json({ error: 'Either the email or the password entered is wrong.' });

            const token = jwt.encode({
                id: foundUser._id
            }, process.env.SECRET);

            res.status(200).cookie('Auth-token', token).json({ user: foundUser, token });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
}