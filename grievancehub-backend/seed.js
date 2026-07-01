const { connectDB } = require('./src/config/database');
const { User, Department, Status, Category } = require('./src/models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Department.deleteMany({});
        await Status.deleteMany({});
        await Category.deleteMany({});
        await User.deleteMany({});

        // 1. Create Departments
        const departments = await Department.insertMany([
            { dept_name: 'Information Technology' },
            { dept_name: 'Human Resources' },
            { dept_name: 'Facilities Management' },
            { dept_name: 'Finance' },
            { dept_name: 'Operations' }
        ]);

        console.log('✅ Departments created');

        // 2. Create Statuses
        const statuses = await Status.insertMany([
            { label: 'Open', color_code: '#1D4ED8', sort_order: 1 },
            { label: 'In Progress', color_code: '#F59E0B', sort_order: 2 },
            { label: 'Resolved', color_code: '#10B981', sort_order: 3 },
            { label: 'Closed', color_code: '#6B7280', sort_order: 4 }
        ]);

        console.log('✅ Statuses created');

        // 3. Create Categories
        const categories = await Category.insertMany([
            {
                category_name: 'Network',
                category_code: 'NET',
                department_id: departments[0]._id,
                description: 'Network related issues'
            },
            {
                category_name: 'Hardware',
                category_code: 'HWD',
                department_id: departments[0]._id,
                description: 'Hardware related issues'
            },
            {
                category_name: 'Payroll',
                category_code: 'PAY',
                department_id: departments[3]._id,
                description: 'Payroll related issues'
            },
            {
                category_name: 'Infrastructure',
                category_code: 'INF',
                department_id: departments[2]._id,
                description: 'Building and infrastructure issues'
            }
        ]);

        console.log('✅ Categories created');

        // 4. Create Admin User
       const admin = await User.create({
    full_name: 'Admin User',
    email: 'admin@example.com',
    password_hash: 'admin123',
    role: 'admin',
    department_id: departments[0]._id,
    is_active: true
});
        console.log('✅ Admin user created');

        // 5. Create Manager User
        const managerPassword = await bcrypt.hash('manager123', 12);
        const manager = await User.create({
            full_name: 'Manager User',
            email: 'manager@example.com',
            password_hash: 'manager123',
            role: 'manager',
            department_id: departments[0]._id,
            is_active: true
        });

        console.log('✅ Manager user created');

        // Update department with manager
        await Department.findByIdAndUpdate(departments[0]._id, {
            manager_id: manager._id
        });

        // 6. Create Employee User
        const employeePassword = await bcrypt.hash('employee123', 12);
        const employee = await User.create({
            full_name: 'Employee User',
            email: 'employee@example.com',
            password_hash: 'employee123',
            role: 'employee',
            department_id: departments[1]._id,
            is_active: true
        });

        console.log('✅ Employee user created');

        console.log('\n📋 SAMPLE LOGIN CREDENTIALS:');
        console.log('================================');
        console.log('Admin:    admin@example.com / admin123');
        console.log('Manager:  manager@example.com / manager123');
        console.log('Employee: employee@example.com / employee123');
        console.log('================================\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seedDatabase();