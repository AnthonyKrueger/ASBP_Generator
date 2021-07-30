const router = require('express').Router()
const {Reward} = require('../models')

router.get('/', async(req, res) => {
    try {
        let stringList = req.session.rewardsList
        let parsedRewards = []
        if(stringList) {
            parsedRewards = JSON.parse(stringList)
            console.log("String List:" + stringList + "Parsed List:" + parsedRewards)
        }
        else {
            const rewardsList = []
            stringList = ""
        }
        req.session.save(() => {
            req.session.rewardsList = stringList
            res.render('homepage', {rewardsList: parsedRewards, stringified: stringList});
          })

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/', async(req, res) => {
    const rewardsList = req.body
    console.log(rewardsList)
    res.render('homepage', {rewardsList: rewardsList, stringified: req.body})
})

module.exports = router;