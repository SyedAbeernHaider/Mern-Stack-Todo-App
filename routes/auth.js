
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");


// sign up

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashpassword });
    await user.save().then(() => res.status(200).json({ message: "SIGN UP SUCCESSFULLY" }));

  } catch (error) {
    res.status(200).json({ message: "User Already Exists" });
  }
})

// sign in


router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up.' });
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    const { password, ...others } = user._doc;
    return res.status(200).json({ ...others });
  } catch (error) {
    console.error('Sign-in error:', error);
    return res.status(500).json({ message: 'An error occurred during sign-in.' });
  }
});





module.exports = router;

