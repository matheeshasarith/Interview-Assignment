import bcrypt from 'bcryptjs'

const admins = [  
  {
    ability: [
      {
        action: 'read',
        subject: 'all'
      }
    ],
    isAdmin: true,
    name: 'Admin',
    email: 'admin@demo.com',
    password:bcrypt.hashSync('12345678', 10),
    isEmailVerified: true,
    isActive:true,
    role:'client',
  },
]

export default admins
