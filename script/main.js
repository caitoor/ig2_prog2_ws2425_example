init();

function init() {

    defaults.main = document.querySelector('main');
    defaults.mainHeight = defaults.main.clientHeight;
    defaults.sun = document.querySelector('.sun');
    defaults.description = document.querySelector('.description');


    createCircles();
}

function createCircles() {
    data.forEach((body) => {
        const div = document.createElement('div');
        div.classList.add('circle', 'hidden');
        if (body.bodyType === "Asteroid") div.classList.add('asteroid');
        if (body.bodyType === "Comet") div.classList.add('comet');
        if (body.bodyType === "Dwarf Planet") div.classList.add('dwarf-planet');
        if (body.bodyType === "Moon") div.classList.add('moon');
        if (body.bodyType === "Planet") div.classList.add('planet');
        if (body.englishName === "Earth") div.classList.add('earth');

        div.setAttribute('data-id', body.id);
        div.setAttribute('data-semimajorAxis', body.semimajorAxis);
        div.setAttribute('data-meanRadius', body.meanRadius);
        div.setAttribute('data-name', body.englishName);
        defaults.main.appendChild(div);

        div.addEventListener('mousemove', (event) => {
            defaults.mouseX = event.pageX;
            defaults.mouseY = event.pageY;
            defaults.description.style.left = `${defaults.mouseX + 10}px`;
            defaults.description.style.top = `${defaults.mouseY - 10}px`;
        });

        div.addEventListener('mouseover', () => {
            defaults.description.textContent = body.englishName;
            defaults.description.classList.remove('hidden');
        });

        div.addEventListener('mouseout', () => {
            const description = document.querySelector('.description');
            description.classList.add('hidden');
        });
    });
}

function concentricBodies() {
    changeNavHighlight(".first-item");
    setCircleVisibility(false);
    setVisibility(defaults.sun, false);
    const shownCircles = document.querySelectorAll('.asteroid, .comet, .dwarf-planet, .moon, .earth');
    const scaleFactor = defaults.mainHeight / (2 * maxCARadius);
    shownCircles.forEach((body) => {
        body.classList.remove('hidden');
        let meanRadius = parseFloat(body.getAttribute('data-meanRadius'));
        meanRadius = meanRadius < 1 ? 1 : meanRadius;
        const size = Math.ceil(meanRadius * scaleFactor);
        body.style.width = `${size}px`;
        body.style.height = `${size}px`;
        body.style.left = '50%';
        body.style.top = '50%';
        body.style.removeProperty('opacity', 'transform');
        body.style.transform = 'translate(-50%, -50%)';
    });
}

function positionedBodies() {
    changeNavHighlight(".second-item");
    setCircleVisibility(true);
    setVisibility(defaults.sun, true);

    document.querySelectorAll('.moon, .planet').forEach(moon => moon.classList.add('hidden'));
    const circles = document.querySelectorAll('.comet, .asteroid, .dwarf-planet');

    circles.forEach(circle => {
        // positioning
        const semimajorAxis = parseFloat(circle.getAttribute('data-semimajorAxis'));
        const axisScaleFactor = defaults.mainHeight / (2 * biggestAxisOfSelection(circles));
        const angle = Math.random() * 360;

        let x = semimajorAxis * axisScaleFactor * Math.cos(angle * (Math.PI / 180));
        let y = semimajorAxis * axisScaleFactor * Math.sin(angle * (Math.PI / 180));

        const offset = 100;

        x += offset * Math.cos(angle * (Math.PI / 180));
        y += offset * Math.sin(angle * (Math.PI / 180));

        circle.style.transform = `translate(${x}px, ${y}px)`;

        // scaling
        const meanRadius = parseFloat(circle.getAttribute('data-meanRadius'));
        const scaleFactor = defaults.mainHeight / (maxCARadius * 10);
        let size = meanRadius * scaleFactor;
        size = clipValue(size, 7, 30);
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        // opacity
        circle.style.opacity = .5;
    });
}