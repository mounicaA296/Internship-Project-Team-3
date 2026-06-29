require('dotenv').config();

const mongoose = require('mongoose');
const { User, Department } = require('./src/models');

async function createUser() {

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    let department = await Department.findOne();

    if (!department) {
        department = await Department.create({
            dept_name: "IT Department"
        });
    }

    const user = await User.create({
        full_name: "Admin User",
        email: "admin@gmail.com",
        password_hash: "admin123",
        role: "admin",
        department_id: department._id
    });

    console.log("User created:");
    console.log(user);

    process.exit();
}

createUser();