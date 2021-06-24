const { Router } = require("express");
const router = Router();

const { login, register } = require("../controllers/auth.controller");
const { loginValidations, registerValidations } = require("../middlewares/validations/auth/validations");

router.post("/login", loginValidations, login);
router.post("/register", registerValidations, register)

module.exports = router;
