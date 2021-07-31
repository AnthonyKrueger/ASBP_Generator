const router = require('express').Router()

router.get('/', async(req, res) => {
    try {
        let stringList = req.session.rewardsList
        let parsedRewards = []
        if(stringList) {
            parsedRewards = JSON.parse(stringList)
            parsedRewards.sort(function(a, b) {
                let keyA = parseInt(a.index)
                let keyB = parseInt(b.index)
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                return 0;
            })
        }
        else {
            const rewardsList = []
            stringList = ""
        }
        req.session.save(() => {
            req.session.rewardsList = stringList
            res.render('homepage', {rewardsList: parsedRewards, stringified: JSON.stringify(parsedRewards, null, 4)});
          })

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/', async(req, res) => {
    const rewardsList = req.body
    res.render('homepage', {rewardsList: rewardsList, stringified: req.body})
})

module.exports = router;