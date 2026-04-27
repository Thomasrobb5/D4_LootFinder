// data.js
const lootData = {
    bosses: [
        {
            id: "varshan",
            name: "Echo of Varshan",
            summon: "Malignant Body Parts (Gurgling Head, Blackened Femur, Trembling Hand, Malignant Heart)",
            location: "Malignant Burrow (Next to Tree of Whispers)",
            difficulty: "World Tier 3 & 4",
            element: "Shadow / Physical",
            cosmetic: "Flesh-Weld Rod",
            loot: {
                Barbarian: ["Fields of Crimson", "100,000 Steps", "Gohr's Devastating Grips", "Ring of Red Furor"],
                Druid: ["Mad Wolf's Glee", "Vasilys Prayer", "Greatstaff of the Crone", "Airidah's Inexorable Will"],
                Necromancer: ["Bloodless Scream", "Deathless Visage", "Deathspeaker's Pendant", "Ring of the Sacrilegious Soul"],
                Rogue: ["Condemnation", "Eyes in the Dark", "Skyhunter", "Scoundrel's Leathers"],
                Sorcerer: ["Staff of Endless Rage", "Esu's Heirloom", "Raiment of the Infinite", "Tal Rasha's Iridescent Loop"],
                "All Classes": ["Frostburn", "Mother's Embrace"]
            }
        },
        {
            id: "grigoire",
            name: "Grigoire, The Galvanic Saint",
            summon: "Living Steel",
            location: "Hall of the Penitent (Dry Steppes)",
            difficulty: "World Tier 3 & 4",
            element: "Lightning",
            cosmetic: "Demonbinder Mount Armor",
            loot: {
                Barbarian: ["Ramaladni's Magnum Opus", "Rage of Harrogath", "Ancients' Oath", "Battle Trance", "Twin Strikes"],
                Druid: ["Insatiable Fury", "Hunter's Zenith", "Waxing Gibbous", "Mjolnic Ryng"],
                Necromancer: ["Blood Artisan's Cuirass", "Howl from Below", "Greaves of the Empty Tomb", "Ebonpiercer"],
                Rogue: ["Word of Hakan", "Grasp of Shadow", "Windforce", "Saboteur's Signet"],
                Sorcerer: ["Staff of Lam Esen", "Iceheart Brais", "Gloves of the Illuminator", "Axial Conduit"],
                "All Classes": ["Penitent Greaves"]
            }
        },
        {
            id: "beast_in_ice",
            name: "The Beast in the Ice",
            summon: "Distilled Fear",
            location: "Glacial Fissure (Fractured Peaks)",
            difficulty: "World Tier 4",
            element: "Cold",
            cosmetic: "Skull Torch Trophy, Fell Steed Mount",
            loot: {
                Barbarian: ["Fields of Crimson", "100,000 Steps", "Ancients' Oath", "Battle Trance", "Hellhammer", "Ring of the Ravenous"],
                Druid: ["Insatiable Fury", "Hunter's Zenith", "Waxing Gibbous", "Storm's Companion", "Unsung Ascetic's Wraps"],
                Necromancer: ["Blood Artisan's Cuirass", "Howl from Below", "Deathless Visage", "Ring of Mendeln", "Mutilator Plate"],
                Rogue: ["Condemnation", "Word of Hakan", "Windforce", "Eaglehorn", "Beastfall Boots"],
                Sorcerer: ["Staff of Endless Rage", "Staff of Lam Esen", "Esu's Heirloom", "Gloves of the Illuminator", "The Oculus", "Starfall Coronet"],
                "All Classes": ["Frostburn", "Mother's Embrace", "Fists of Fate", "Tassets of the Dawning Sky", "Paingorger's Gauntlets"]
            }
        },
        {
            id: "lord_zir",
            name: "Lord Zir",
            summon: "Exquisite Blood",
            location: "The Darkened Way (Fractured Peaks)",
            difficulty: "World Tier 4",
            element: "Shadow / Fire / Blood",
            cosmetic: "The Diadem of the Ancient Helm",
            loot: {
                Barbarian: ["Ramaladni's Magnum Opus", "Rage of Harrogath", "Gohr's Devastating Grips", "Overkill", "Arreat's Bearing"],
                Druid: ["Mad Wolf's Glee", "Vasilys Prayer", "Greatstaff of the Crone", "Fleshrender", "Wildheart Hunger"],
                Necromancer: ["Blood Artisan's Cuirass", "Deathless Visage", "Greaves of the Empty Tomb", "Lidless Wall", "Cruor's Embrace"],
                Rogue: ["Grasp of Shadow", "Eyes in the Dark", "Skyhunter", "Asheara's Khanjar", "Scoundrel's Kiss"],
                Sorcerer: ["Staff of Endless Rage", "Iceheart Brais", "Raiment of the Infinite", "Esadora's Overflowing Cameo", "Fractured Winterglass"],
                "All Classes": ["Penitent Greaves", "Razorplate", "Temerity", "Yen's Blessing"]
            }
        },
        {
            id: "duriel",
            name: "Duriel, King of Maggots",
            summon: "Mucus-Slick Egg + Shard of Agony",
            location: "Gaping Crevasse (Kehjistan)",
            difficulty: "World Tier 4",
            element: "Poison",
            cosmetic: "Smoldering Brimstone Mount",
            loot: {
                Barbarian: ["Azurewrath", "Tuskhelm of Joritz the Mighty"],
                Druid: ["Tempest Roar", "Dolmen Stone"],
                Necromancer: ["Black River", "Blood Moon Breeches"],
                Rogue: ["Cowl of the Nameless", "Scoundrel's Leathers"],
                Sorcerer: ["Flamescar", "Blue Rose"],
                "All Classes": ["Godslayer Crown", "Flickerstep", "Tibault's Will", "X'Fal's Corroded Signet", "Soulbrand", "Banished Lord's Talisman"],
                "Mythic Uniques": ["Doombringer", "The Grandfather", "Melted Heart of Selig", "Andariel's Visage", "Harlequin Crest", "Ring of Starless Skies", "Ahavarion, Spear of Lycander", "Tyrael's Might"]
            }
        },
        {
            id: "andariel",
            name: "Echo of Andariel",
            summon: "Sandscorched Shackles + Pincushioned Doll",
            location: "Hanged Man's Hall (Kehjistan)",
            difficulty: "World Tier 4",
            element: "Poison / Fire / Lightning",
            cosmetic: "Andariel's Visage (Cosmetic Drop)",
            loot: {
                Barbarian: ["Azurewrath", "Tuskhelm of Joritz the Mighty"],
                Druid: ["Tempest Roar", "Dolmen Stone"],
                Necromancer: ["Black River", "Blood Moon Breeches"],
                Rogue: ["Cowl of the Nameless", "Scoundrel's Leathers"],
                Sorcerer: ["Flamescar", "Blue Rose"],
                "All Classes": ["Godslayer Crown", "Flickerstep", "Tibault's Will", "X'Fal's Corroded Signet", "Soulbrand", "Banished Lord's Talisman"],
                "Mythic Uniques": ["Doombringer", "The Grandfather", "Melted Heart of Selig", "Andariel's Visage", "Harlequin Crest", "Ring of Starless Skies", "Ahavarion, Spear of Lycander", "Tyrael's Might"]
            }
        }
    ],
    generalPool: [
        "These items can drop anywhere in the game (Helltides, Nightmare Dungeons, The Pit, Infernal Hordes), but have target-farm locations on the bosses listed above."
    ]
};

// Generate Inverted Index for fast search
// itemMap: { "itemName": { classes: [], bosses: [] } }
const itemDatabase = {};

lootData.bosses.forEach(boss => {
    Object.entries(boss.loot).forEach(([className, items]) => {
        items.forEach(itemName => {
            if (!itemDatabase[itemName]) {
                itemDatabase[itemName] = {
                    name: itemName,
                    classes: new Set(),
                    bosses: new Set()
                };
            }
            itemDatabase[itemName].classes.add(className);
            itemDatabase[itemName].bosses.add(boss);
        });
    });
});

// Convert sets to arrays for easier usage
const allItems = Object.keys(itemDatabase).sort().map(key => {
    return {
        name: key,
        classes: Array.from(itemDatabase[key].classes),
        bosses: Array.from(itemDatabase[key].bosses)
    };
});
