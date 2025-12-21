require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nano-shoe-business');
        console.log('Connected to MongoDB');

        const email = 'theshoeclub@gmail.com';
        const newPassword = 'yahya1234';

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Find and update or create
        const user = await User.findOne({ username: email });

        if (user) {
            user.password = hashedPassword;
            await user.save();
            console.log(`Admin ${email} password updated to ${newPassword}`);
        } else {
            const newUser = new User({
                username: email,
                password: hashedPassword
            });
            await newUser.save();
            console.log(`Admin ${email} created with password ${newPassword}`);
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

resetAdmin();
