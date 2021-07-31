async function postReward (event) {
    event.preventDefault()
    let postBody = {}
    postBody.freeItemName = await $(".freeItemName").val()
    postBody.freeItemCount = await $(".freeItemCount").val()
    postBody.freeItemType = await $(".freeItemType").val()
    postBody.freeCommandText = await $(".freeCommandText").val()
    postBody.freeCommandItem = await $(".freeCommandItem").val()
    postBody.freeCommandItemType = await $(".freeCommandItemType").val()
    postBody.freeCommandLore = await $(".freeCommandLore").val()
    postBody.freePokemon = await $(".freePokemon").val()
    postBody.freeTexture = await $(".freeTexture").val()
    postBody.freeLevel = await $(".freeLevel").val()
    postBody.freeMiniv = await $(".freeMiniv").val()
    postBody.freeNature = await $(".freeNature").val()
    postBody.premiumItemName = await $(".premiumItemName").val()
    postBody.premiumItemCount = await $(".premiumItemCount").val()
    postBody.premiumItemType = await $(".premiumItemType").val()
    postBody.premiumCommandText = await $(".premiumCommandText").val()
    postBody.premiumCommandItem = await $(".premiumCommandItem").val()
    postBody.premiumCommandItemType = await $(".premiumCommandItemType").val()
    postBody.premiumCommandLore = await $(".premiumCommandLore").val()
    postBody.premiumPokemon = await $(".premiumPokemon").val()
    postBody.premiumTexture = await $(".premiumTexture").val()
    postBody.premiumLevel = await $(".premiumLevel").val()
    postBody.premiumMiniv = await $(".premiumMiniv").val()
    postBody.premiumNature = await $(".premiumNature").val()
    postBody.index = await $(".index").val()

    console.log(postBody)
    const response = await fetch('/api/rewards', {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
        document.location.reload()
    }

}

async function clearAll() {
    const response = await fetch('/api/rewards', {
        method: 'DELETE'
    })
    if(response.ok) {
        document.location.reload()
    }
}

const rewardForm = $(".rewardForm")
rewardForm.bind('submit', postReward)

const clearButton = $(".clearBtn")
clearButton.bind('click', clearAll)