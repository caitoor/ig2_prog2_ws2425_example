let defaults = {
    transitionDuration: .5
};

// maximum Radiae of diffreent body groups
const maxRadius = Math.max(...data.map(body => body.meanRadius));
const maxNonPlanetRadius = Math.max(...data.filter(body => body.isPlanet === false).map(body => body.meanRadius));
const maxAsteroidRadius = Math.max(...data.filter(body => body.bodyType === "Asteroid").map(body => body.meanRadius));
const maxCometRadius = Math.max(...data.filter(body => body.bodyType === "Comet").map(body => body.meanRadius));
const maxCARadius = maxAsteroidRadius > maxCometRadius ? maxAsteroidRadius : maxCometRadius;

function biggestAxisOfSelection(selection) {
    let biggestAxis = 0;
    selection.forEach(body => {
        const semimajorAxis = parseFloat(body.getAttribute('data-semimajorAxis'));
        if (semimajorAxis > biggestAxis) biggestAxis = semimajorAxis;
    });
    return biggestAxis;
}

function biggestRadiusOfSelection(selection) {
    let biggestRadius = 0;
    selection.forEach(body => {
        const meanRadius = parseFloat(body.getAttribute('data-meanRadius'));
        if (meanRadius > biggestRadius) biggestRadius = meanRadius;
    });
    return biggestRadius;
}

function getUniqueBodyTypes(data) {
    const bodyTypes = data.map(body => body.bodyType);
    const uniqueBodyTypes = [...new Set(bodyTypes)];
    return uniqueBodyTypes;
}
const uniqueBodyTypes = getUniqueBodyTypes(data);
console.log(`${uniqueBodyTypes.length} unique body types: ${getUniqueBodyTypes(data)}`);

function clearNavHighlight() {
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active-item'));
}

function changeNavHighlight(className) {
    clearNavHighlight();
    document.querySelector(className).classList.add('active-item');
}

function setCircleVisibility(bool) {
    const circles = document.querySelectorAll('.circle')
    if (bool) circles.forEach(circle => circle.classList.remove('hidden'));
    else circles.forEach(circle => circle.classList.add('hidden'));
}

function setVisibility(element, bool) {
    if (bool) element.classList.remove('hidden');
    else element.classList.add('hidden');
}

function scaleSize(element, scaleFactor) {
    const size = parseFloat(element.style.width);
    element.style.width = `${size * scaleFactor}px`;
    element.style.height = `${size * scaleFactor}px`;
}

function clipValue(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    else return value;
}