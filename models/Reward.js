const { formatObjectString, formatSpecs, formatPokemonLore } = require("../utils/formatters")

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
      this.rewards.free.message = `You Have Claimed Your Level ${this.index} Reward!`
      this.rewards.premium.message = `You Have Claimed Your Level ${this.index} Premium Reward!`
  }

  addItem(bptype, source, item, amount) {
      if(bptype == "free") {
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
      if(bptype == "free") {
          this.rewards.free.rewards.push(`pokegive @p ${pokemon} ${formatSpecs(specs)}`)
          this.rewards.free.display.item = `${pokemon}`
          this.rewards.free.display.sprite = true
          this.rewards.free.display.lore.push(formatPokemonLore(pokemon, specs))
      }
      else {
        this.rewards.premium.rewards.push(`pokegive @p ${pokemon} ${formatSpecs(specs)}`)
        this.rewards.premium.display.item = pokemon
        this.rewards.premium.display.sprite = true
        this.rewards.premium.display.lore.push(formatPokemonLore(pokemon, specs))
      }
  }

  addCommand(bptype, command, source, item, lore) {
      if(bptype == "free") {
          this.rewards.free.rewards.push(`${command}`)
          this.rewards.free.display.item = `${source}:${item}`
          this.rewards.free.display.sprite = false
          this.rewards.free.display.lore.push(lore)
      }
      else {
        this.rewards.premium.rewards.push(`${command}`)
        this.rewards.premium.display.item = `${source}:${item}`
        this.rewards.premium.display.sprite = false
        this.rewards.premium.display.lore.push(lore)
      }
  }
}

module.exports = Reward