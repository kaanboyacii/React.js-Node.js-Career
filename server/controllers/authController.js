import User from "../models/UserModel.js"
import bcrypt from "bcrypt";
import { createError } from "../error/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
      await newUser.save();
      res.status(201).send("User has been created!");
    } catch (err) {
      next(err);
    }
  }
  
  export const signin = async (req, res, next) => {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (!user) return next(createError(404, "User not found!"));
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) return next(createError(400, "Wrong credentials!"));
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...others } = user._doc;
  
      res.cookie("access_token", token, {
        httpOnly: true
      }).json(others);
    } catch (err) {
      next(err);
    }
  }
  
  export const logout = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
        return res.json({ message: 'Successfully logged out' });
      });
    } catch (err) {
      next(err);
    }
  }
  
  export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("access_token", token, {
          httpOnly: true,
        }).json(user._doc);
      } else {
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
        res.cookie("access_token", token, {
          httpOnly: true,
        }).json(savedUser._doc);
      }
    } catch (err) {
      next(err);
    }
  };
  