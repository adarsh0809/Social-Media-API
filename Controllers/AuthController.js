import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registering a new User
export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    email,
    password: hashedPass,
    name,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (validity) {
                // Generate JWT
                const token = jwt.sign(
                    { id: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                res.status(200).json({ user, token });
            } else {
                res.status(400).json("Wrong Password");
            }
        } else {
            res.status(404).json("User does not exist");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
