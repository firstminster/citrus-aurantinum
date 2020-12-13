import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Walter Okorie',
    email: 'walter@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Promise Harry',
    email: 'promise@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
