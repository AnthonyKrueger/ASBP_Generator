
// Helper Functions for String Formatting

function formatObjectString(string) {
    let first = string.charAt(0);
    first = first.toUpperCase()
    last = string.slice(1)
    last = last.replace("_", " ")
    return (first + last)
}

function formatSpecs(specs) {
    let specsString = ""
    if(specs.shiny) {
        specsString = specsString.concat("shiny ")
    }
    if(specs.customTexture) {
        specsString = specsString.concat(`customtexture:${specs.customTexture} `)
    }
    if(specs.level) {
        specsString = specsString.concat(`level:${specs.level} `)
    }
    if(specs.nature) {
        specsString = specsString.concat(`n:${specs.nature} `)
    }
    if(specs.growth) {
        specsString = specsString.concat(`gr:${specs.growth} `)
    }
    if(specs.ability) {
        specsString = specsString.concat(`ab:${specs.ability} `)
    }
    if(specs.miniv) {
        specsString = specsString.concat(`miniv%:${specs.miniv} `)
    }
    return specsString;
}

function formatPokemonLore(pokemon, specs) {
    let loreString = "";
    if(specs.level) {
        loreString = loreString.concat(`Lvl:${specs.level}`)
    }
    if(specs.shiny) {
        if(loreString != "") {
            loreString = loreString.concat(" ")
        }
        loreString = loreString.concat("Shiny")
    }
    if(specs.customTexture) {
        if(loreString != "") {
            loreString = loreString.concat(" ")
        }
        loreString = loreString.concat(formatObjectString(specs.customTexture))
    }
    if(loreString != "") {
        loreString = loreString.concat(" ")
    }
    loreString = loreString.concat(formatObjectString(pokemon))
    return loreString;
}

// Reward Class

class Reward {
    index = 1;
    rewards = {
        premium: {
         rewards: [],
         display: {
            item: "minecraft:diamond",
            sprite: false,
            glow: false,
            name: "Premium",
            lore: []
        },
        message: "You Have Claimed a Premium Reward"
    },
        free: {
         rewards: [],
         display: {
            item: "minecraft:diamond",
            sprite: false,
            glow: false,
            name: "Free",
            lore: []
        },
        message: "You Have Claimed a Reward"
    }
  }

  initReward(index) {
      this.index = index
      this.rewards.free.display.name = `Level ${this.index} Reward`
      this.rewards.premium.display.name = `Level ${this.index} Premium Reward`
  }

  addItem(bptype, source, item, amount) {
      if(bptype = "free") {
          this.rewards.free.rewards.push(`give @p ${source}:${item} ${amount}`)
          this.rewards.free.display.item = `${source}:${item}`
          this.rewards.free.display.sprite = false
          this.rewards.free.display.lore.push(`${amount}x ` + formatObjectString(item))
      }
      else {
        this.rewards.premium.rewards.push(`give @p ${source}:${item} ${amount}`)
        this.rewards.premium.display.item = `${source}:${item}`
        this.rewards.premium.display.sprite = false
        this.rewards.premium.display.lore.push(`${amount}x ` + formatObjectString(item))
      }
  }

  addPokemon(bptype, pokemon, specs) {
      if(bptype = "free") {
          this.rewards.free.rewards.push(`pokegive @p ${pokemon} ${formatSpecs(specs)}`)
          this.rewards.free.display.item = `${pokemon}`
          this.rewards.free.display.sprite = true
          this.rewards.free.display.lore.push(formatPokemonLore(pokemon, specs))
      }
      else {
        this.rewards.premium.rewards.push(`pokegive @p ${pokemon} ${formatSpecs(specs)}`)
        this.rewards.premium.display.item = `${pokemon}`
        this.rewards.premium.display.sprite = true
        this.rewards.premium.display.lore.push(formatPokemonLore(pokemon, specs))
      }
  }

  addCommand(bptype, command) {
      if(bptype = "free") {
          this.rewards.free.rewards.push(`${command}`)
      }
      else {
        this.rewards.premium.rewards.push(`${command}`)
      }
  }
}

// Loading the page

function loadForms(rewardList) {
    const formsDiv = $('.formsDiv')
    formsDiv.empty()
    rewardList.forEach((reward, index) => {
        const newForm = $(`        <div class="row blue">
        <h4>Level ${index + 1}</h4>
        <form class="col s4 green" data-rewardIndex=${index}>
            <span>Add item</span>
            <div class="row">
                <div class="input-field col s6">
                  <input placeholder="Item Name" type="text" class="itemName">
                </div>
                <div class="input-field col s6">
                  <input type="text" class="itemCount">
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <select>
                      <option value="minecraft">Minecraft</option>
                      <option value="pixelmon" selected>Pixelmon</option>
                    </select>
                    <label>Item Source</label>
                  </div>
                <div class="input-field col s12">
                    <select class="bpType">
                      <option value="free" selected>Free</option>
                      <option value="premium">Premium</option>
                    </select>
                    <label>BP type</label>
                  </div>
                  <div class="col s12 center">
                    <button class="addReward btn waves-effect waves-light red accent-1" type="submit">Add Reward</button>
                </div>
            </div>
        </form>
        <form class="col s4 yellow data-rewardIndex=${index}">
            <span>Add Command</span>
            <div class="row">
                <div class="input-field col s12">
                  <input placeholder="Command" type="text" class="commandText">
                </div>
                <div class="input-field col s12">
                    <select class="bpType">
                      <option value="free" selected>Free</option>
                      <option value="premium">Premium</option>
                    </select>
                    <label>BP type</label>
                  </div>
                  <div class="col s12 center">
                    <button class="addReward btn waves-effect waves-light red accent-1" type="submit">Add Reward</button>
                </div>
            </div>
        </form>
        <form class="col s4 purple data-rewardIndex=${index}">
            <span>Add Pokemon</span>
            <div class="row">
                <div class="input-field col s12">
                  <input placeholder="Pokemon" type="text" class="pokemonName">
                </div>
                <div class="input-field col s12">
                  <input placeholder="Custom Texture" type="text" class="textureName">
                </div>
                <div class="input-field col s12">
                  <input placeholder="Level" type="text" class="level">
                </div>
                <div class="input-field col s12">
                  <input placeholder="Nature" type="text" class="nature">
                </div>
                <div class="input-field col s12">
                  <input placeholder="Min IV %" type="text" class="miniv">
                </div>
                <div class="input-field col s12">
                    <select class="bpType">
                      <option value="free" selected>Free</option>
                      <option value="premium">Premium</option>
                    </select>
                    <label>BP type</label>
                  </div>
                  <div class="col s12 center">
                    <button class="addReward btn waves-effect waves-light red accent-1" type="submit">Add Reward</button>
                </div>
            </div>
        </form>
    </div>`)
    formsDiv.append(newForm)

    })

}

// Things Happening

const rewardList = {
    rewards: []
}

for(i = 0; i < 100; i++) {
    const testReward = new Reward
    testReward.initReward(i + 1)
    rewardList.rewards.push(testReward)
}
rewardList.rewards[2].addPokemon("free", "pikachu", {level: 50})
console.log(JSON.stringify(rewardList))
 loadForms(rewardList.rewards)