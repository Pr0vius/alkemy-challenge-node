const { Router } = require("express");
const router = Router();
const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller");
const {
    getAllUsersValidations,
    getUserByIdValidations,
    postUserValidations,
    putUserValidations,
    deleteUserValidations,
} = require("../middlewares/validations/request/validations");

router
  .route("/")
  .get(getAllUsersValidations, getAllUsers)
  .post(postUserValidations, createUser)
;
router
  .route("/:id")
  .get(getUserByIdValidations, getUser)
  .put(putUserValidations, updateUser)
  .delete(deleteUserValidations, deleteUser)
;

module.exports = router;
