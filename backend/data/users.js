import bcrypt from 'bcryptjs'

const users = [
  {
    ability: [
      {
        action: 'manage',
        subject: 'ACL'
      }
    ],
    isAdmin: false,
    name: 'Business',
    email: 'business@demo.com',
    password: bcrypt.hashSync('12345678', 10),
    businessName: 'Business',
    registrationNo: 678456,
    businessDescription: 'Business',
    businessDomain: 'IT',
    businessWebsite: 'www.business.com',
    contactNo: 772953417,
    isEmailVerified: true,
    isActive: true,
    role: 'client',
  },
]
export default users
