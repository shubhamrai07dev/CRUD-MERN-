import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ message: "user data not found" });
    }
    const savedData = await userData.save();
    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get all data
export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ message: "user data not found" });
    }
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// get single user data
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "user data not found" });
    }
    res.status(200).json(userExist);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// update user data
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // console.log(updatedData);
    res.status(200).json({ message: "user updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// delete user data
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
