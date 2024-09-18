function deleteEntryByKeyValue(key, value, all = true) {
    data.forEach((entry, index) => {
        if (entry[key] === value) {
            data.splice(index, 1);
            if (!all) return;
        }
    });
}

deleteEntryByKeyValue('englishName', 'Sun');

console.log(`loaded ${data.length} bodies.`);
