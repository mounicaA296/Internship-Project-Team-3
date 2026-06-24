const { connectDB } = require('./src/config/database');
const { User, Department, Status } = require('./src/models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        await connectDB();

        await Department.deleteMany({});
        await Status.deleteMany({});
        await User.deleteMany({});

        const departments = await Department.insertMany([
            { dept_name: 'Information Technology' },
            { dept_name: 'Human Resources' },
            { dept_name: 'Facilities' },
            { dept_name: 'Finance' }
        ]);

        console.log('✅ Departments created');

        const statuses = await Status.insertMany([
            { label: 'Open', color_code: '#1D4ED8', sort_order: 1 },
            { label: 'In Progress', color_code: '#F59E0B', sort_order: 2 },
            { label: 'Resolved', color_code: '#10B981', sort_order: 3 },
            { label: 'Closed', color_code: '#6B7280', sort_order: 4 }
        ]);

        console.log('✅ Statuses created');

        const adminPassword = 'admin123';

        await User.create({
            full_name: 'Admin User',
            email: 'admin@example.com',
            password_hash: adminPassword,
            role: 'admin',
            department_id: departments[0]._id,
            is_active: true
        });

        console.log('✅ Admin user created');

        const employeePassword = 'employee123';

        await User.create({
            full_name: 'Employee User',
            email: 'employee@example.com',
            password_hash: employeePassword,
            role: 'employee',
            department_id: departments[1]._id,
            is_active: true
        });

        console.log('✅ Employee user created');

        console.log('\n📋 Sample Login Credentials:');
        console.log('Admin: admin@example.com / admin123');
        console.log('Employee: employee@example.com / employee123');

        process.exit(0);

    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seedDatabase();