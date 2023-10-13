const UserModel = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const createNewUser = async (req, res) => {
  try {
    const newUser = await UserModel.create({
      username: req.body.userName,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    const userInfo = await UserModel.findOne({ username: newUser.username });
    const userObject = userInfo.toObject();
    const encodedToken = jwt.sign({ id: userInfo._id }, process.env.JWT_SEC, {
      expiresIn: '3d',
    });
    const { password, ...userInfoWithoutPassword } = userObject;
    res
      .status(201)
      .json({ data: { user: userInfoWithoutPassword, encodedToken } });
  } catch (error) {
    res.status(500).json(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const userInfo = await UserModel.findOne({ username: req.body.username });
    const userObject = userInfo.toObject();
    if (!userInfo) return res.status(401).json({ message: 'Wrong Username' });

    const hashedPassword = CryptoJS.AES.decrypt(
      userInfo.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res.status(401).json({ msg: 'Wrong password' });
    }
    const encodedToken = jwt.sign({ id: userInfo._id }, process.env.JWT_SEC, {
      expiresIn: '3d',
    });
    const { password, ...userInfoWithoutPassword } = userObject;
    res
      .status(201)
      .json({ data: { user: userInfoWithoutPassword, encodedToken } });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userInfo = await UserModel.findOne({ username: req.query.username });
    const userObject = userInfo.toObject();
    if (!userInfo) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const { password, ...userInfoWithoutPassword } = userObject;
      res.status(201).json({ data: { user: userInfoWithoutPassword } });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createNewUser, userLogin, getUserProfile };
