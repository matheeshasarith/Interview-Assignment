import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Admin from '../models/adminModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

let tokens = [];

const authUser = asyncHandler(async (req, res) => {
  
  const data = {
    users: [
      {
        _id: 1,
        fullName: 'John Doe',
        username: 'johndoe',
        password: 'admin',
        avatar: '@src/assets/images/portrait/small/avatar-s-11.jpg',
        email: 'admin@demo.com',
        role: 'admin',
        ability: [
          {
            action: 'manage',
            subject: 'all'
          }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        },
        token: generateToken(2),
      },
      {
        _id: 2,
        fullName: 'Jane Doe',
        username: 'janedoe',
        password: 'client',
        avatar: 'src/assets/images/avatars/1-small.png',
        email: 'client@demo.com',
        role: 'client',
        ability: [
          {
            action: 'manage',
            subject: 'ACL'
          }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        },
        businessDescription: 'business',
        businessDomain: 'business',
        businessName: 'business',
        businessWebsite: 'www.business.com',
        contactNo: '0123456789',
        createdAt:'2022-10-17T04:27:03.396Z',
        isActive: 'true',
        isAdmin: 'false',
        isEmailVerified: 'true',
        refreshToken: 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.xWqqnuTTM3ilPX4FyiM4mpU3SP30_ofFRu1a1VfrFjsNiIsInR5cCI6IkpXVCJ9',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.rFq3AL25NxDmmPDiUlJgEkHgUsBXYmcknc2Nrx8gpCI',
        updatedAt: '2022-10-17T04:27:26.181Z',
        token: generateToken(2),
      },
      {
        _id: '634cd99750732e04af766200',
        fullName: 'Jane Doe',
        username: 'janedoe',
        password: '12345678',
        avatar: 'src/assets/images/avatars/1-small.png',
        email: 'matheeshaadhikari@outlook.com',
        role: 'client',
        ability: [
          {
            action: 'manage',
            subject: 'ACL'
          },
          // {
          //   action: 'manage',
          //   subject: 'Auth'
          // }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        },
        businessDescription: 'business',
        businessDomain: 'business',
        businessName: 'business',
        businessWebsite: 'www.business.com',
        contactNo: '0123456789',
        createdAt:'2022-10-17T04:27:03.396Z',
        isActive: 'true',
        isAdmin: 'true',
        isEmailVerified: 'true',
        refreshToken: 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.xWqqnuTTM3ilPX4FyiM4mpU3SP30_ofFRu1a1VfrFjsNiIsInR5cCI6IkpXVCJ9',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.rFq3AL25NxDmmPDiUlJgEkHgUsBXYmcknc2Nrx8gpCI',
        updatedAt: '2022-10-17T04:27:26.181Z',
      },
      {
        _id: '634e6385ade84b1a978d652d',
        fullName: 'Jane Doe',
        username: 'janedoe',
        password: '12345678',
        avatar: 'src/assets/images/avatars/1-small.png',
        email: 'Pingala_Pakshi@yahoo.com',
        role: 'client',
        ability: [
          {
            action: 'read',
            subject: 'all'
          }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        },
        businessDescription: 'business',
        businessDomain: 'business',
        businessName: 'business',
        businessWebsite: 'www.business.com',
        contactNo: '0123456789',
        createdAt:'2022-10-17T04:27:03.396Z',
        isActive: 'true',
        isAdmin: 'true',
        isEmailVerified: 'true',
        refreshToken: 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.xWqqnuTTM3ilPX4FyiM4mpU3SP30_ofFRu1a1VfrFjsNiIsInR5cCI6IkpXVCJ9',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.rFq3AL25NxDmmPDiUlJgEkHgUsBXYmcknc2Nrx8gpCI',
        updatedAt: '2022-10-17T04:27:26.181Z',
      },
      {
        _id: '6347fadea4e5d73813210ded',
        fullName: 'Jane Doe',
        username: 'janedoe',
        password: '12345678',
        avatar: 'src/assets/images/avatars/1-small.png',
        email: 'sarithmatheesha@gmail.com',
        role: 'admin',
        ability: [
          {
            action: 'manage',
            subject: 'ACL'
          },
          {
            action: 'read',
            subject: 'Auth'
          }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        },
        businessDescription: 'business',
        businessDomain: 'business',
        businessName: 'business',
        businessWebsite: 'www.business.com',
        contactNo: '0123456789',
        createdAt:'2022-10-17T04:27:03.396Z',
        isActive: 'true',
        isAdmin: 'true',
        isEmailVerified: 'true',
        refreshToken: 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.xWqqnuTTM3ilPX4FyiM4mpU3SP30_ofFRu1a1VfrFjsNiIsInR5cCI6IkpXVCJ9',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.rFq3AL25NxDmmPDiUlJgEkHgUsBXYmcknc2Nrx8gpCI',
        updatedAt: '2022-10-17T04:27:26.181Z',
      }
    ]
  }

  const jwtConfig = {
    secret: 'abc123',
    refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
    expireTime: '30d',
    refreshTokenExpireTime: '10m'
  }
 

const {email, password} = req.body.args

let error = {
  email: ['Something went wrong']
}



const user = await User.findOne({ email })
const admin = await Admin.findOne({ email })



if (user) {
  if (!(await user.matchPassword(password))) {
    error = {
      email: ['Password not match.']
    }
  }
  else if (!user.isActive) {
    error = {
      email: ['Account is not active.']
    }
  } else {
    try {
      const accessToken = jwt.sign({ id: user._id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
      const refreshToken = jwt.sign({ id: user._id }, jwtConfig.refreshTokenSecret, {
        expiresIn: jwtConfig.refreshTokenExpireTime
      })

      const userData = user

      delete userData.password

      const response = {
        userData,
        accessToken,
        refreshToken,
      }

      return res.json(response)
     
    } catch (e) {
      error = e
    }
  }
} else if (admin) {
  if (!(await admin.matchPassword(password))) {
    error = {
      email: ['Password not match.']
    }
  }
  else {
    try {
      
      const accessToken = jwt.sign({ id: admin._id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
      const refreshToken = jwt.sign({ id: admin._id }, jwtConfig.refreshTokenSecret, {
        expiresIn: jwtConfig.refreshTokenExpireTime
      })

      const userData = admin

      delete userData.password

      const response = {
        userData,
        accessToken,
        refreshToken,
      }

      return res.json(response)
      
    } catch (e) {
      error = e
    }
  }
} else {
  error = {
    email: ['Email or Password is Invalid']
  }
}

return res.status(400).json(error)


})

const authUserNext = asyncHandler(async (req, res) => {

  const data = {
    users: [
      {
        _id: 1,
        fullName: 'John Doe',
        username: 'johndoe',
        password: 'admin',
        avatar: '@src/assets/images/portrait/small/avatar-s-11.jpg',
        email: 'admin@demo.com',
        role: 'admin',
        ability: [
          {
            action: 'manage',
            subject: 'all'
          }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        },
        token: generateToken(2),
      },
      {
        _id: 2,
        fullName: 'Jane Doe',
        username: 'janedoe',
        password: 'client',
        avatar: 'src/assets/images/avatars/1-small.png',
        email: 'client@demo.com',
        role: 'client',
        ability: [
          {
            action: 'manage',
            subject: 'ACL'
          }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        },
        businessDescription: 'business',
        businessDomain: 'business',
        businessName: 'business',
        businessWebsite: 'www.business.com',
        contactNo: '0123456789',
        createdAt:'2022-10-17T04:27:03.396Z',
        isActive: 'true',
        isAdmin: 'false',
        isEmailVerified: 'true',
        refreshToken: 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.xWqqnuTTM3ilPX4FyiM4mpU3SP30_ofFRu1a1VfrFjsNiIsInR5cCI6IkpXVCJ9',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.rFq3AL25NxDmmPDiUlJgEkHgUsBXYmcknc2Nrx8gpCI',
        updatedAt: '2022-10-17T04:27:26.181Z',
        token: generateToken(2),
      },
      {
        _id: '634cd99750732e04af766200',
        fullName: 'Jane Doe',
        username: 'janedoe',
        password: '12345678',
        avatar: 'src/assets/images/avatars/1-small.png',
        email: 'matheeshaadhikari@outlook.com',
        role: 'client',
        ability: [
          {
            action: 'manage',
            subject: 'ACL'
          },
          // {
          //   action: 'manage',
          //   subject: 'Auth'
          // }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        },
        businessDescription: 'business',
        businessDomain: 'business',
        businessName: 'business',
        businessWebsite: 'www.business.com',
        contactNo: '0123456789',
        createdAt:'2022-10-17T04:27:03.396Z',
        isActive: 'true',
        isAdmin: 'true',
        isEmailVerified: 'true',
        refreshToken: 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.xWqqnuTTM3ilPX4FyiM4mpU3SP30_ofFRu1a1VfrFjsNiIsInR5cCI6IkpXVCJ9',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.rFq3AL25NxDmmPDiUlJgEkHgUsBXYmcknc2Nrx8gpCI',
        updatedAt: '2022-10-17T04:27:26.181Z',
      },
      {
        _id: '634e6385ade84b1a978d652d',
        fullName: 'Jane Doe',
        username: 'janedoe',
        password: '12345678',
        avatar: 'src/assets/images/avatars/1-small.png',
        email: 'Pingala_Pakshi@yahoo.com',
        role: 'client',
        ability: [
          {
            action: 'read',
            subject: 'all'
          }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        },
        businessDescription: 'business',
        businessDomain: 'business',
        businessName: 'business',
        businessWebsite: 'www.business.com',
        contactNo: '0123456789',
        createdAt:'2022-10-17T04:27:03.396Z',
        isActive: 'true',
        isAdmin: 'true',
        isEmailVerified: 'true',
        refreshToken: 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.xWqqnuTTM3ilPX4FyiM4mpU3SP30_ofFRu1a1VfrFjsNiIsInR5cCI6IkpXVCJ9',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.rFq3AL25NxDmmPDiUlJgEkHgUsBXYmcknc2Nrx8gpCI',
        updatedAt: '2022-10-17T04:27:26.181Z',
      },
      {
        _id: '6347fadea4e5d73813210ded',
        fullName: 'Jane Doe',
        username: 'janedoe',
        password: '12345678',
        avatar: 'src/assets/images/avatars/1-small.png',
        email: 'sarithmatheesha@gmail.com',
        role: 'admin',
        ability: [
          {
            action: 'manage',
            subject: 'ACL'
          },
          {
            action: 'read',
            subject: 'Auth'
          }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        },
        businessDescription: 'business',
        businessDomain: 'business',
        businessName: 'business',
        businessWebsite: 'www.business.com',
        contactNo: '0123456789',
        createdAt:'2022-10-17T04:27:03.396Z',
        isActive: 'true',
        isAdmin: 'true',
        isEmailVerified: 'true',
        refreshToken: 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.xWqqnuTTM3ilPX4FyiM4mpU3SP30_ofFRu1a1VfrFjsNiIsInR5cCI6IkpXVCJ9',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNkOTk3NTA3MzJlMDRhZjc2NjIwMCIsImlhdCI6MTY2NjE3NDAzOSwiZXhwIjoxNjY2MTc0NjM5fQ.rFq3AL25NxDmmPDiUlJgEkHgUsBXYmcknc2Nrx8gpCI',
        updatedAt: '2022-10-17T04:27:26.181Z',
      }
    ]
  }
 
const { email, password } = req.body

  const user = await User.findOne({ email })
  const admin = await Admin.findOne({ email })


if(user){
   
  if(!user.isActive){
    res.status(404)
    throw new Error('Account not active...!')
  }

  
  if ((await user.matchPassword(password))) {
   
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
  }else {
    res.status(400)
    throw new Error('Invalid Password...!')
  }

} else if(admin) {

  if ((await admin.matchPassword(password))) {
       res.json({
         _id: admin._id,
         name: admin.name,
         email: admin.email,
         isAdmin: admin.isAdmin,
         token: generateToken(admin._id),
       })
  }else {
    res.status(400)
    throw new Error('Invalid Password...!')
  }

} else {
    res.status(400)
    throw new Error('Invalid User Data...!')
}

})

const registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password, address, contactNo } = req.body

  const userExists = await User.findOne({ email })
  
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    address, 
    contactNo,
    isEmailVerified: false,
    isActive: true,
    role: 'client',
    ability: [
      {
        action: 'manage',
        subject: 'ACL'
      }
    ],
  })

  if (user) {
    

    const token = jwt.sign({ email },
      '05F14A8C8D84766098AC0E064D320EA6'
    );

    tokens.push(token);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


export {
  authUser,
  registerUser,
  authUserNext,
}
