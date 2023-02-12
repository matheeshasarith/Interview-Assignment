// const jwt = require("jsonwebtoken");
import  jwt from 'jsonwebtoken'

//const bcrypt = require("bcrypt");
import bcrypt from 'bcrypt'

// require("dotenv").config();
import dotenv from 'dotenv'
dotenv.config();

// const User = require("../models/User");
import User from '../models/userModel.js'

//const emailService = require("./EmailService");

let refreshTokens = [];
//let tokens = [];
let tokens = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcml0aG1hdGhlZXNoYUBnbWFpbC5jb20iLCJpYXQiOjE2NjU1ODkyNzV9.OVwX8WS4Pnqv-Sml8SMuXmlTczHsS1h37jRJFgsAqyg'];

const authenticate = ({ accessToken }) => {
  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    //console.log(accessToken);

    return {
      success: true,
      message: "user authenticated",
    };
  } catch (err) {
    if (err.message === "jwt expired") {
      return {
        success: false,
        error: "jwt expired",
      };
    } else {
      return {
        success: false,
        error: "server side error",
      };
    }
  }
};

const refreshAccessToken = ({ refreshToken }) => {
  if (!refreshTokens.includes(refreshToken)) {
    return {
      success: false,
      error: "invalid refresh token",
    };
  }

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    const { email } = decodedToken;
    const accessToken = jwt.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "10m" }
    );

    return {
      success: true,
      accessToken,
    };
  } catch (err) {
    const error = err.message;

    if (error === "invalid signature") {
      return {
        success: false,
        error: "invalid signature",
      };
    } else if (error === "jwt expired") {
      return {
        success: false,
        error: "jwt expired",
      };
    } else {
      return {
        success: false,
        error: "server side error",
      };
    }
  }
};

const register = async ({
  firstName,
  lastName,
  dob,
  gender,
  password,
  email,
}) => {
  try {
    const userDocument = await User.find({ email: email });

    if (userDocument.length > 0) {
      console.log("here 1");
      return {
        success: false,
        error: "email already exists",
      };
    }
  } catch (e) {
    console.log("here 2");
    return {
      success: false,
      error: "server side error",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userModel = new User({
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    gender: gender,
    email: email,
    password: hashedPassword,
    isEmailVerified: false,
    isActive: true,
  });

  userModel.save();

  try {
    const token = jwt.sign(
      { email },
      process.env.EMAIL_CONFIRMATION_TOKEN_SECRET
    );

    tokens.push(token);

    await emailService.sendAccountVerificationEMail({
      email: email,
      token: token,
    });
    console.log("here 3");

    return {
      success: true,
      message: "registration successful",
    };
  } catch (err) {
    console.log("here 4");
    return {
      success: false,
      error: "server side error",
    };
  }
};

const confirmation = async (token) => {
  if (!tokens.includes(token)) {
    return {
      success: false,
      error: "invalid token",
    };
  }

  try {
    const decodedToken = jwt.verify(
      token,
      //process.env.EMAIL_CONFIRMATION_TOKEN_SECRET
      '05F14A8C8D84766098AC0E064D320EA6'
    );
    const { email } = decodedToken;
    //console.log(decodedToken);

    try {
      await User.findOneAndUpdate({ email: email }, { isEmailVerified: true });
      let accessToken = jwt.sign(
        { email },
        //process.env.ACCESS_TOKEN_SECRET_KEY,
        '05F14A8C8D84766098AC0E064D320EA6',
        { expiresIn: "10m" }
      );
      let refreshToken = jwt.sign(
        { email },
       // process.env.REFRESH_TOKEN_SECRET_KEY,
        '05F14A8C8D84766098AC0E064D320EA6',
        { expiresIn: "1y" }
      );

      tokens.splice(tokens.indexOf(token));
      refreshTokens.push(refreshToken);

      return {
        success: true,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      return {
        status: false,
        error: "server side error1",
      };
    }
  } catch (err) {
    return {
      status: false,
      error: "server side error2",
    };
  }
};

const login = async ({ email, password }) => {
  let isAuthenticated = false;
  let isEmailVerified = false;

  try {
    const userDocument = await User.find({ email: email });
    isAuthenticated = await bcrypt.compare(password, userDocument[0].password);
    if (userDocument[0].isEmailVerified) {
      isEmailVerified = true;
    }
  } catch (err) {
    isAuthenticated = false;
  }

  if (isAuthenticated) {
    if (isEmailVerified) {
      let accessToken = jwt.sign(
        { email },
        `${process.env.ACCESS_TOKEN_SECRET_KEY}`,
        { expiresIn: "10m" }
      );
      let refreshToken = jwt.sign(
        { email },
        `${process.env.REFRESH_TOKEN_SECRET_KEY}`,
        { expiresIn: "1y" }
      );

      refreshTokens.push(refreshToken);

      return {
        success: true,
        accessToken,
        refreshToken,
      };
    } else {
      return {
        success: false,
        error: "email not verified",
      };
    }
  } else {
    return {
      success: false,
      error: "wrong credentials",
    };
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    try {
      const userDocument = await User.find({ email: email });

      if (
        userDocument === undefined ||
        Object.entries(userDocument).length === 0
      ) {
        return {
          success: false,
          error: "email not found",
        };
      }

      const token = jwt.sign(
        { email },
        process.env.EMAIL_RESET_TOKEN_SECRET_KEY
      );

      tokens.push(token);

      await emailService.sendPasswordResetEmail({ email, token });
      return {
        success: true,
        message: "email sent",
      };
    } catch (err) {
      return {
        success: false,
        error: "server side error",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: "server side error",
    };
  }
};

const validatePasswordResetToken = (token) => {
  if (!tokens.includes(token)) {
    return {
      success: false,
      error: "invalid token",
    };
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.EMAIL_RESET_TOKEN_SECRET_KEY
    );
    const { email } = decodedToken;

    if (email === undefined) {
      return {
        success: false,
        error: "invalid token",
      };
    }

    const accessToken = jwt.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
      { email },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "1y" }
    );

    tokens.splice(tokens.indexOf(token));
    refreshTokens.push(refreshToken);

    return {
      success: true,
      message: "token validated successfully.",
    };
  } catch (err) {
    return {
      success: false,
      error: "server side error",
    };
  }
};

const setNewPassword = async ({ token, password }) => {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.EMAIL_RESET_TOKEN_SECRET_KEY
    );
    const { email } = decodedToken;

    if (email === undefined) {
      return res.status(400).json({
        success: false,
        error: "invalid token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate({ email: email }, { password: hashedPassword });

    return {
      success: true,
      message: "password successfully updated",
    };
  } catch (err) {
    return {
      success: false,
      error: "server side error",
    };
  }
};

// module.exports = {
//   authenticate,
//   refreshAccessToken,
//   register,
//   confirmation,
//   login,
//   sendPasswordResetEmail,
//   validatePasswordResetToken,
//   setNewPassword,
// };


//export { confirmation }

export default confirmation