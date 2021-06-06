const jwt = require('jwt-simple');
const User = require('../models/User');

module.exports = {
    protectRoutes: async(req, res, next) => {
        try {
            const token = req.cookies['Auth-token'];

            if(!token) return res.status(401).json({ error: 'Unauthorized' });

            const { id: decodedId } = jwt.decode(token, process.env.SECRET);
            const user = await User.findById(decodedId);
            console.log(user);

            if(!user) return res.status(401).json({ error: 'Unauthorized' });
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
        }
    }
}