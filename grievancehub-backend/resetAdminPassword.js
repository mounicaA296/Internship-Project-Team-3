require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./src/models/User");

const resetPassword = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected");

        const newPassword = "Admin@123";

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const result = await User.updateOne(
            { email: "admin@gmail.com" },
            {
                password_hash: hashedPassword
            }
        );

        console.log("Password reset completed");
        console.log(result);

        console.log("New Admin Password:", newPassword);

        await mongoose.disconnect();

    } catch (error) {

        console.error(error);
        process.exit(1);

    }

};

resetPassword();