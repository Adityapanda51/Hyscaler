const User = require("../models/user-model");

const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res
      .status(200)
      .send("Welcome to construction management system using router");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    //hash password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      // password: hash_password,
      password,
    });

    const token = await userCreated.generateToken();

    res.status(201).json({
      msg: "Registration successful",
      token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // const userExist = await User.findOne({ email });
    const userExist = await User.findOne({ email: email.trim() });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const passwordMatch = await bcrypt.compare(password, userExist.password);
    const passwordMatch = await bcrypt.compare(
      password.trim(),
      userExist.password
    );
    const token = await userExist.generateToken();

    if (passwordMatch) {
      res.status(200).json({
        msg: "Login successful",
        token,
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

module.exports = { home, register, login };
