const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
/**
 * const router = require("express").Router();
const  User = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});
	return schema.validate(data);
};
router.post("/login", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

i need this code in email
router.post('/register',async function(req,res){
	const {email} = req.body
	try {
		const user = await User.findOne({email})
		if(user){
			throw Error()
		}
			const newUser = new User(req.body)
			const savedUser = newUser.save()
			res.status(200).json({user:savedUser})

	}catch(error) {
		res.send({error:"erreur"})
	}
})








 router.post("/reset_password", async (req, res) => {
   const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
   let randomCode = "";
   for (let i = 0; i < 25; i++) {
     randomCode += characters[Math.floor(Math.random() * characters.length)];
   }
   await User.findOneAndUpdate(
     { email: req.body.email },
     { resetCode: randomCode },
    {
       new: true,
     }
   ).then((user) => {
     if (user) {
       console.log(user);
       nodemailer.sendResetPasswordEmail(req.body.email, randomCode);
       res.send({ msg: "email de reinitialisation envoyé avec succes" });
     } else {
      res.send({ err: "aucun compte est associé avec cette email" });
    }
 });
});


module.exports = router;
 */