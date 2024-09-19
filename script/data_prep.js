function deleteEntryByKeyValue(key, value, all = true) {
    data.forEach((entry, index) => {
        if (entry[key] === value) {
            data.splice(index, 1);
            if (!all) return;
        }
    });
}

function sortBodiesByKey(key, asc=false) {
    data.sort((a, b) => {
        if (asc) {
            return a[key] - b[key];
        } else {
            return b[key] - a[key];
        }
    });
}

deleteEntryByKeyValue('englishName', 'Sun');
sortBodiesByKey('meanRadius');

console.log(`loaded ${data.length} bodies.`);
