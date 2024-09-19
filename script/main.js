init();

function init() {

    defaults.main = document.querySelector('main');
    defaults.mainHeight = defaults.main.clientHeight;
    defaults.sun = document.querySelector('.sun');
    defaults.description = document.querySelector('.description');
    defaults.earthScale = defaults.mainHeight / 6371; // mean radius of earth
    defaults.plutoAxisScale = defaults.mainHeight / (2 * 5906440628); // semimajor axis of pluto
    defaults.currentView = 'concentric';

    createCircles();

    defaults.sun.addEventListener('click', () => {
        if (defaults.currentView === 'positioned') positionedBodies();
    });

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
        div.setAttribute('data-angle', Math.random() * 360);
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

        div.addEventListener('click', function () {
            switch (defaults.currentView) {
                case 'concentric':
                    const scaleFactor = defaults.mainHeight / parseFloat(this.getAttribute('data-meanRadius'));
                    concentricBodies(scaleFactor);
                    break;
                case 'positioned':
                    const axisScaleFactor = defaults.mainHeight / (2 * parseFloat(this.getAttribute('data-semimajorAxis')));
                    positionedBodies(axisScaleFactor);
                    break;
            }
        });

        // initial view of concentric bodies with earth scaled to viewport size:
        concentricBodies();
    });
}

function concentricBodies(scaleFactor = defaults.earthScale) {
    scaleFactor *= .9;
    changeNavHighlight(".first-item");
    defaults.currentView = 'concentric';
    setCircleVisibility(false);
    setVisibility(defaults.sun, false);

    const circles = document.querySelectorAll('.circle');

    circles.forEach((body) => {
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

function positionedBodies(axisScaleFactor = defaults.plutoAxisScale) {
    console.log(`showing positioned bodies with axisScaleFactor: ${axisScaleFactor}`);

    defaults.currentView = 'positioned';
    changeNavHighlight(".second-item");
    setCircleVisibility(true);
    setVisibility(defaults.sun, true);

    axisScaleFactor *= .5;
    document.querySelectorAll('.moon').forEach(moon => moon.classList.add('hidden'));

    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        // positioning
        const semimajorAxis = parseFloat(circle.getAttribute('data-semimajorAxis'));

        const angle = circle.getAttribute('data-angle');

        let x = semimajorAxis * axisScaleFactor * Math.cos(angle * (Math.PI / 180));
        let y = semimajorAxis * axisScaleFactor * Math.sin(angle * (Math.PI / 180));

        const offset = 100;

        x += offset * Math.cos(angle * (Math.PI / 180));
        y += offset * Math.sin(angle * (Math.PI / 180));

        circle.style.transform = `translate(${x}px, ${y}px)`;

        // scaling
        const meanRadius = parseFloat(circle.getAttribute('data-meanRadius'));
        const size = logaritmicMap(clipValue(meanRadius, 1, meanRadius), 1, 69911, 5, 75);
        const sizeModificationByZoom = clipValue(map(axisScaleFactor, 0, defaults.plutoAxisScale, .5, 1), .5, 1);
        circle.style.width = `${size * sizeModificationByZoom}px`;
        circle.style.height = `${size * sizeModificationByZoom}px`;

        // opacity
        circle.style.opacity = .5;
    });
}