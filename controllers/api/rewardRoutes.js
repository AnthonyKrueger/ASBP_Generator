const { Reward } = require('../../models')
const router = require('express').Router()

router.post("/", (req, res) => {
    try {
        const postBody = req.body
        console.log(postBody)
        let rewardsList = []
        if (req.session.rewardsList) {
            rewardsList = JSON.parse(req.session.rewardsList)
        }
        const newReward = new Reward
        newReward.initReward(rewardsList.length + 1)

        if(postBody.freeItemName != "") {
            let count = 1
            if(postBody.freeItemCount) {
                count = parseInt(postBody.freeItemCount, 10)
            }
            newReward.addItem("free", postBody.freeItemType, postBody.freeItemName, count)
        }
        if(postBody.freeCommandText != "") {
            let source = "minecraft"
            let item = "diamond"
            let lore = "A command reward!"
            if(postBody.freeCommandItemType != "") {
                source = postBody.freeCommandItemType
            }
            if(postBody.freeCommandItem != "") {
                item = postBody.freeCommandItem
            }
            if(postBody.freeCommandLore != "") {
                lore = postBody.freeCommandLore
            }
            newReward.addCommand("free", postBody.freeCommandText, source, item, lore)
        }
        if(postBody.freePokemon) {
            let specs = {}
            if(postBody.freeLevel) {
                specs.level = postBody.freeLevel
            }
            if(postBody.freeTexture) {
                specs.customTexture = postBody.freeTexture
            }
            if(postBody.freeMiniv) {
                specs.miniv = postBody.freeMiniv
            }
            if(postBody.freeNature) {
                specs.nature = postBody.freeNature
            }
            newReward.addPokemon("free", postBody.freePokemon, specs)
        }
        if(postBody.premiumItemName != "") {
            let count = 1
            if(postBody.premiumItemCount) {
                count = parseInt(postBody.premiumItemCount, 10)
            }
            newReward.addItem("premium", postBody.premiumItemType, postBody.premiumItemName, count)
        }
        if(postBody.premiumCommandText != "") {
            let source = "minecraft"
            let item = "diamond"
            let lore = "A command reward!"
            if(postBody.premiumCommandItemType != "") {
                source = postBody.premiumCommandItemType
            }
            if(postBody.premiumCommandItem != "") {
                item = postBody.premiumCommandItem
            }
            if(postBody.premiumCommandLore != "") {
                lore = postBody.premiumCommandLore
            }
            newReward.addCommand("premium", postBody.premiumCommandText, source, item, lore)
        }
        if(postBody.premiumPokemon) {
            let specs = {}
            if(postBody.premiumLevel) {
                specs.level = postBody.premiumLevel
            }
            if(postBody.premiumTexture) {
                specs.customTexture = postBody.premiumTexture
            }
            if(postBody.premiumLevel) {
                specs.level = postBody.premiumLevel
            }
            if(postBody.premiumMiniv) {
                specs.miniv = postBody.premiumMiniv
            }
            if(postBody.premiumNature) {
                specs.nature = postBody.premiumNature
            }
            newReward.addPokemon("premium", postBody.premiumPokemon, specs)
        }
        rewardsList.push(newReward)
        const stringified = JSON.stringify(rewardsList)
        req.session.save(() => {
            req.session.rewardsList = stringified
            res.status(200).json(req.session.rewardsList);
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})

module.exports = router;