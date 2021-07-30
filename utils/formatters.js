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

module.exports = {formatObjectString, formatSpecs, formatPokemonLore}