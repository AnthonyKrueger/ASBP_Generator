function postReward (event) {
    event.preventDefault()
    let postBody = {}
    postBody.freeItemName = $(".freeItemName").val()
    postBody.freeItemCount = $(".freeItemCount").val()
    postBody.freeItemType = $(".freeItemType").val()
    postBody.freeCommandText = $(".freeCommandText").val()
    postBody.freeCommandItem = $(".freeCommandItem").val()
    postBody.freeCommandItemType = $(".freeCommandItemType").val()
    postBody.freeCommandLore = $(".freeCommandLore").val()
    postBody.freePokemon = $(".freePokemon").val()
    postBody.freeTexture = $(".freeTexture").val()
    postBody.freeLevel = $(".freeLevel").val()
    postBody.freeMiniv = $(".freeMiniv").val()
    postBody.freeNature = $(".freeNature").val()
    postBody.premiumItemName = $(".premiumItemName").val()
    postBody.premiumItemCount = $(".premiumItemCount").val()
    postBody.premiumItemType = $(".premiumItemType").val()
    postBody.premiumCommandText = $(".premiumCommandText").val()
    postBody.premiumCommandItem = $(".premiumCommandItem").val()
    postBody.premiumCommandItemType = $(".premiumCommandItemType").val()
    postBody.premiumCommandLore = $(".premiumCommandLore").val()
    postBody.premiumPokemon = $(".premiumPokemon").val()
    postBody.premiumTexture = $(".premiumTexture").val()
    postBody.premiumLevel = $(".premiumLevel").val()
    postBody.premiumMiniv = $(".premiumMiniv").val()
    postBody.premiumNature = $(".premiumNature").val()

    console.log(postBody)
    const response = fetch('/api/rewards', {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
        // document.location.reload()
    }

}

const rewardForm = $(".rewardForm")
rewardForm.bind('submit', postReward)