const fs = require('fs');

const md = fs.readFileSync('Drops.md', 'utf8');
const lines = md.split('\n').map(l => l.trim());

const bosses = [];
let currentBoss = null;
let currentClass = null;

const generalPool = [];
const mythicUniques = [];

let inGeneralPool = false;
let inMythicUniques = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === 'General Unique Pool') {
        inGeneralPool = true;
        continue;
    }
    
    if (inGeneralPool) {
        if (line.includes('Boss Cheat Sheet')) continue;
        if (line.startsWith('+ All Class Specific')) {
            inGeneralPool = false;
            continue;
        }
        if (line.startsWith('‍')) {
            generalPool.push(line.replace('‍', '').replace(' ?', '').trim());
        }
        continue;
    }

    if (line === 'Mythic Uniques') {
        if (lines[i+1] === 'Boss Loot Tables') {
            inMythicUniques = true;
            currentBoss = null;
            continue;
        }
    }

    if (inMythicUniques) {
        if (line === 'Summary') {
            inMythicUniques = false;
            continue;
        }
        if (line.startsWith('‍')) {
            // "‍Shattered Vow (Barb, Druid, Spiritborn)"
            // let's just capture the item name, but wait, data.js has the name without the class restrictions.
            // Let's strip everything after '('
            const name = line.replace('‍', '').split('(')[0].trim();
            mythicUniques.push(name);
        }
        continue;
    }

    // Boss Name heuristic: followed by 'Boss Loot Tables'
    if (lines[i+1] === 'Boss Loot Tables' && line !== 'Mythic Uniques') {
        const bossName = line.trim();
        currentBoss = {
            id: bossName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''),
            name: bossName,
            summon: "Unknown",
            location: "Unknown",
            difficulty: "Torment 1+",
            element: "Unknown",
            cosmetic: "Unknown",
            loot: {}
        };
        bosses.push(currentBoss);
        currentClass = null;
        i++; // skip Boss Loot Tables
        continue;
    }

    if (!currentBoss) continue;

    if (line.startsWith('Boss Lair Key:')) {
        currentBoss.summon = line.replace('Boss Lair Key:', '').trim();
    } else if (line.startsWith('Element Type:')) {
        currentBoss.element = line.replace('Element Type:', '').trim();
    } else if (line.startsWith('Cosmetic Reward:')) {
        currentBoss.cosmetic = line.replace('Cosmetic Reward:', '').replace(/‍/g, '').trim();
    } else if (line.match(/is located|East of|South of|West of|North of|near the|resides in|at the end of|in Kehjistan/i) && currentBoss.location === 'Unknown') {
        currentBoss.location = line.replace(/The | is located | is | resides in /, '').trim();
    } else if (line === 'Barbarian:') {
        currentClass = 'Barbarian';
        currentBoss.loot[currentClass] = [];
    } else if (line === 'Druid:') {
        currentClass = 'Druid';
        currentBoss.loot[currentClass] = [];
    } else if (line === 'Necromancer:') {
        currentClass = 'Necromancer';
        currentBoss.loot[currentClass] = [];
    } else if (line === 'Paladin:') {
        currentClass = 'Paladin';
        currentBoss.loot[currentClass] = [];
    } else if (line === 'Rogue:') {
        currentClass = 'Rogue';
        currentBoss.loot[currentClass] = [];
    } else if (line === 'Sorcerer:') {
        currentClass = 'Sorcerer';
        currentBoss.loot[currentClass] = [];
    } else if (line === 'Spiritborn:') {
        currentClass = 'Spiritborn';
        currentBoss.loot[currentClass] = [];
    } else if (line === 'Warlock:') {
        currentClass = 'Warlock';
        currentBoss.loot[currentClass] = [];
    } else if (line === 'Multiple Classes:') {
        currentClass = 'All Classes';
        currentBoss.loot[currentClass] = [];
    } else if (currentBoss.name === 'The Butcher' && line.includes('‍')) {
        // Handle table-like lines for Butcher
        const parts = line.split('\t');
        if (parts.length >= 2) {
            const classes = parts[0].trim();
            const item = parts[1].replace(/‍/g, '').replace(' ?', '').trim();
            if (!currentBoss.loot[classes]) currentBoss.loot[classes] = [];
            currentBoss.loot[classes].push(item);
        }
    } else if (currentClass && line.startsWith('‍')) {
        currentBoss.loot[currentClass].push(line.replace('‍', '').replace(' ?', '').trim());
    } else if (currentClass && line === 'TBD') {
        // optionally add TBD or leave empty
        // let's add TBD
        currentBoss.loot[currentClass].push('TBD');
    }
}

// Add mythic uniques to all bosses
bosses.forEach(boss => {
    // If it's a boss that has TBD or no items, we might not add it, but previously all bosses had it.
    // In old data.js, astaroth, bartuc, belial_lord_of_lies only had Mythic Uniques.
    if (boss.id === 'astaroth' || boss.id === 'bartuc' || boss.id === 'belial_lord_of_lies') {
        // Wait, Drops.md now has items for Astaroth and Bartuc!
        // Let's just always append Mythic Uniques to whatever loot exists.
        if (!boss.loot) boss.loot = {};
        boss.loot['Mythic Uniques'] = [...mythicUniques];
    } else {
        boss.loot['Mythic Uniques'] = [...mythicUniques];
    }
});

const output = "// data.js\n" +
"const lootData = {\n" +
"    bosses: " + JSON.stringify(bosses, null, 4) + ",\n" +
"    generalPool: " + JSON.stringify(generalPool, null, 4) + "\n" +
"};\n\n" +
"// Generate Inverted Index for fast search\n" +
"// itemMap: { 'itemName': { classes: [], bosses: [] } }\n" +
"const itemDatabase = {};\n\n" +
"lootData.bosses.forEach(boss => {\n" +
"    if (boss.loot) {\n" +
"        Object.entries(boss.loot).forEach(([className, items]) => {\n" +
"            items.forEach(itemName => {\n" +
"                if (!itemDatabase[itemName]) {\n" +
"                    itemDatabase[itemName] = {\n" +
"                        name: itemName,\n" +
"                        classes: new Set(),\n" +
"                        bosses: new Set()\n" +
"                    };\n" +
"                }\n" +
"                itemDatabase[itemName].classes.add(className);\n" +
"                itemDatabase[itemName].bosses.add(boss);\n" +
"            });\n" +
"        });\n" +
"    }\n" +
"});\n\n" +
"// Convert sets to arrays for easier usage\n" +
"const allItems = Object.keys(itemDatabase).sort().map(key => {\n" +
"    return {\n" +
"        name: key,\n" +
"        classes: Array.from(itemDatabase[key].classes),\n" +
"        bosses: Array.from(itemDatabase[key].bosses)\n" +
"    };\n" +
"});\n";

fs.writeFileSync('data.js', output);
console.log('Done!');
