const { Router } = require("express");
const router = Router();

const notFount = (req, res, next) => {
    res.status(404).json({ status: 404, message: "Page not Found" });
};

router
    .route("*")
    .get(notFount)
    .post(notFount)
    .put(notFount)
    .delete(notFount)
;

module.exports = router;
