const { Router } = require("express");
const { search } = require("../controllers/search.controller");

const router = new Router();

router.get('/:collection/:toSearch', search);


module.exports = router;