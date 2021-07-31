let jsonShowing = false;
let importShowing = false;

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

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

async function submitImport(event) {
    event.preventDefault()
    let importText = await $("#importText").val()
    if(isJsonString(importText)) {
        importText = JSON.parse(importText)
        const response = await fetch("/api/rewards/import", {
            method: "POST",
            body: JSON.stringify(importText),
            headers: { 'Content-Type': 'application/json' }
        })
        if(response.ok) {
            document.location.reload()
        }
        else {
            alert("Json Import Failed");
            return;
        }
    }
    else {
        alert("Not a valid JSON object");
        return;
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

function copyJson() {
    const jsonText = $(".jsonText").val()
    $(".jsonText").select()
    console.log("copied")
    document.execCommand("copy")
}

function toggleView() {
    const jsonView = $(".jsonView")
    const viewBtn = $(".viewBtn")
    if(importShowing) {
        toggleImport()
    }
    if(jsonShowing) {
        jsonView.addClass("hide")
        viewBtn.html("View/Copy Json")
        jsonShowing = false
    }
    else {
        jsonView.removeClass("hide")
        viewBtn.html("Hide Json")
        jsonShowing = true
    }
}

function toggleImport() {
    if(jsonShowing) {
        toggleView()
    }
    const importView = $(".importView")
    const importBtn = $(".importBtn")
    if(importShowing) {
        importView.addClass("hide")
        importBtn.html("Import JSON")
        importShowing = false
    }
    else {
        importView.removeClass("hide")
        importBtn.html("Cancel Import")
        importShowing = true
    }
}





const rewardForm = $(".rewardForm")
rewardForm.bind('submit', postReward)

const clearBtn = $(".clearBtn")
clearBtn.bind('click', clearAll)

const viewBtn = $(".viewBtn")
viewBtn.bind('click', toggleView)

const importBtn = $(".importBtn")
importBtn.bind('click', toggleImport)

const importForm = $(".importForm")
importForm.bind('submit', submitImport)

const copyBtn = $(".copyBtn")
copyBtn.bind("click", copyJson)
