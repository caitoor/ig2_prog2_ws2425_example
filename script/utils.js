let defaults = {};

// data analysis:

function biggestAxisOfSelection(selection) {
    // get the biggest semimajoraxis of a selection
    let biggestAxis = 0;
    selection.forEach(body => {
        const semimajorAxis = parseFloat(body.getAttribute('data-semimajorAxis'));
        if (semimajorAxis > biggestAxis) biggestAxis = semimajorAxis;
    });
    return biggestAxis;
}

function biggestRadiusOfSelection(selection) {
    // get the biggest meanradius of a selection of bodies
    let biggestRadius = 0;
    selection.forEach(body => {
        const meanRadius = parseFloat(body.getAttribute('data-meanRadius'));
        if (meanRadius > biggestRadius) biggestRadius = meanRadius;
    });
    return biggestRadius;
}

function getUniqueBodyTypes(data) {
    // get all available body types of the data
    const bodyTypes = data.map(body => body.bodyType);
    const uniqueBodyTypes = [...new Set(bodyTypes)];
    return uniqueBodyTypes;
}


// generic data manipulation:

function clipValue(value, min, max) {
    // clip value to min and max
    if (value < min) return min;
    else if (value > max) return max;
    else return value;
}

function map(value, inMin, inMax, outMin, outMax) {
    // map value from one range to another
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function logaritmicMap(value, inMin, inMax, outMin, outMax) {
    // map value from one range to another with a logaritmic scale
    if (value > inMax) {
        // linear interpolation beyond the maximum
        return map(value, inMax, inMax * 2, outMax, outMax * 2);
    } else {
        return Math.exp(map(Math.log(value), Math.log(inMin), Math.log(inMax), Math.log(outMin), Math.log(outMax)));
    }
}

// dom manipulation:
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
    // scale dom elmeent by a factor
    const size = parseFloat(element.style.width);
    element.style.width = `${size * scaleFactor}px`;
    element.style.height = `${size * scaleFactor}px`;
}



//LOGS:
const uniqueBodyTypes = getUniqueBodyTypes(data);
console.log(`${uniqueBodyTypes.length} unique body types: ${getUniqueBodyTypes(data)}`);

