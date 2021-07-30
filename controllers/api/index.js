const router = require('express').Router()
const rewardRoutes = require("./rewardRoutes")

router.use("/rewards", rewardRoutes)

module.exports = router