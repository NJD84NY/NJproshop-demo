import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: true,
  },
  {
    name: 'Nejad Yazdani',
    email: 'Nejad@email.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: false,
  },
  {
    name: 'Khalil yazdi',
    email: 'khalil@email.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: false,
  },
];

export default users;
