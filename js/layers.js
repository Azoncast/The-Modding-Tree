addLayer("p", {
    name: "bit", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#03fc52",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "bits", // Name of prestige currency
    baseResource: "datas", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "First Test",
            description: "Double your point gain.",
            cost: new Decimal(3),
        },
        12: {
            title: "Second  Test",
            description: "bits boost datas gain.",
            cost: new Decimal(6),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            
        },
        13: {
            title: "Third  Test",
            description: "bits boost bits gain",
            cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            
        },
    },
    layerShown(){return true}
})

addLayer("x", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "bytes",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "bits",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(20),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        
    },
})
