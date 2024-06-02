document.addEventListener('DOMContentLoaded', function() {
    const sections = [
        `<div class="section textlanding center-content">
            <div style="text-align: center;">
                <div>
                    <p class="name" style="display: inline; vertical-align: middle;">JUAN</p>
                    <img src="images/ola.webp" alt="ola" style="width: 80px; height: 75px; vertical-align: middle;">
                    <p class="name" style="display: inline; vertical-align: middle;">MIGUEL</p>
                </div>
                <div>
                    <p class="soame" style="display: inline; vertical-align: middle;">COLL GONZÁLEZ</p>
                </div>
                <hr style="width: 100px; height: 1px; border:none;color:#333;background-color:#333;">
            </div>
            <div class="image-links">
                <a class="contact-logo" href="https://www.linkedin.com/in/jmcoll/"><img src="images/linkedin.svg" alt="LinkedIn" style="width: 30px; height: 30px;"></a>
                <a class="contact-logo" href="https://github.com/JuanMi-CG"><img src="images/github.png" alt="GitHub" style="width: 30px; height: 30px;"></a>
            </div>
            <p>👋 Hi! I'm a <b>Data Engineer / Data Scientist - Test2</b></p>
            <button class="hire-me" id="hireMeButton">HIRE ME</button>
        </div>`,
        `<div class="section textlanding center-content">
            <h2>Technologies</h2>
            <div class="tech-logos">
                <div class="tech-item" onclick="showModal('Excel', 'images/excel.webp', 'Excel es una herramienta poderosa para el análisis y visualización de datos.', ['Formulas', 'Macros', 'Pivot Tables'])">
                    <div class="tech-logo-container">
                        <img src="images/excel.webp" alt="Excel" class="tech-logo logo-excel">
                    </div>
                    <p class="tech-text tech-text-left">Excel</p>
                </div>
                <div class="tech-item" onclick="showModal('Python', 'images/python.png', 'Python es un lenguaje de programación versátil y potente para análisis de datos y machine learning.', ['Data Analysis', 'Machine Learning', 'Web Scraping'])">
                    <div class="tech-logo-container">
                        <img src="images/python.png" alt="Python" class="tech-logo logo-python">
                    </div>
                    <p class="tech-text tech-text-left">Python</p>
                </div>
                <div class="tech-item" onclick="showModal('SQL', 'images/sql.png', 'SQL es esencial para gestionar y consultar bases de datos relacionales.', ['Queries', 'Database Design', 'Stored Procedures'])">
                    <div class="tech-logo-container">
                        <img src="images/sql.png" alt="SQL" class="tech-logo logo-sql">
                    </div>
                    <p class="tech-text tech-text-right">SQL</p>
                </div>
                <div class="tech-item" onclick="showModal('PowerBI', 'images/powerbi.png', 'PowerBI es una herramienta de visualización de datos para crear dashboards e informes interactivos.', ['Dashboards', 'Reports', 'Data Modeling'])">
                    <div class="tech-logo-container">
                        <img src="images/powerbi.png" alt="PowerBI" class="tech-logo logo-powerbi">
                    </div>
                    <p class="tech-text tech-text-right">PowerBI</p>
                </div>
            </div>
        </div>`,
        `<div class="section textlanding center-content">
            <h2>Your business Sales</h2>
            <canvas id="salesChart"></canvas>
            <div class="quote">*This graph dynamically updates based on user's mouse position</div>
        </div>`,
    ];

    const container = document.getElementById('container');
    let currentIndex = 0;

    function loadSection() {
        if (currentIndex < sections.length) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sections[currentIndex];
            container.appendChild(tempDiv.firstChild);
            currentIndex++;
        }

        if (currentIndex < sections.length) {
            setTimeout(loadSection, 1000);
        } else if (currentIndex === sections.length) {
            initializeChart();
        }
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sections[0];
    container.appendChild(tempDiv.firstChild);
    currentIndex++;

    setTimeout(loadSection, 1000);

    const data = {
        labels: [],
        datasets: [{
            label: 'Sales',
            data: [],
            backgroundColor: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    let salesChart;
    let hireMeButton;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function getDistanceFromHireMeButton(event) {
        const rect = hireMeButton.getBoundingClientRect();
        const buttonX = rect.left + (rect.width / 2);
        const buttonY = rect.top + (rect.height / 2);
        const distance = Math.sqrt(Math.pow(event.clientX - buttonX, 2) + Math.pow(event.clientY - buttonY, 2));
        return distance;
    }

    function getColorBasedOnDistance(distance) {
        const maxDistance = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2));
        const intensity = Math.max(0, 1 - (distance / maxDistance));
        return `rgba(54, 162, 235, ${0.2 + (0.8 * intensity)})`;
    }

    function getSalesValueFromDistance(distance) {
        const maxDistance = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) / 3;
        const minSales = 0;
        const maxSales = 5000;

        let value = maxSales - ((distance / maxDistance) * (maxSales - minSales));
        value = Math.max(minSales, value);

        if (distance >= maxDistance) {
            value += 400;
        }

        return value;
    }

    let monthIndex = 0;
    function addData() {
        const distance = getDistanceFromHireMeButton(mouseEvent);
        const newValue = getSalesValueFromDistance(distance);
        const newMonth = months[monthIndex % 12];

        if (data.labels.length >= 12) {
            data.labels.shift();
            data.datasets[0].data.shift();
            data.datasets[0].backgroundColor.shift();
        }
        
        data.labels.push(newMonth);
        data.datasets[0].data.push(newValue);
        data.datasets[0].backgroundColor.push(getColorBasedOnDistance(distance));

        salesChart.update();
        monthIndex++;
    }

    let mouseEvent = { clientX: 0, clientY: 0 };

    document.addEventListener('mousemove', (event) => {
        mouseEvent = event;
    });

    function initializeChart() {
        const ctx = document.getElementById('salesChart').getContext('2d');
        hireMeButton = document.getElementById('hireMeButton');
        salesChart = new Chart(ctx, config);
        setInterval(addData, 1000);
    }
});

document.addEventListener('mousemove', (e) => {
    const mouseIndicator = document.getElementById('mouseIndicator');
    mouseIndicator.style.left = `${e.pageX - 20}px`;
    mouseIndicator.style.top = `${e.pageY - 25}px`;

    const hireMeButton = document.getElementById('hireMeButton');
    const buttonRect = hireMeButton.getBoundingClientRect();
    const indicatorRect = mouseIndicator.getBoundingClientRect();

    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    const indicatorCenterX = indicatorRect.left + indicatorRect.width / 2;
    const indicatorCenterY = indicatorRect.top + indicatorRect.height / 2;

    const angle = Math.atan2(buttonCenterY - indicatorCenterY, buttonCenterX - indicatorCenterX);
    const arrow = document.getElementById('arrow');
    const distance = 20;

    const arrowX = indicatorCenterX + distance * Math.cos(angle) - indicatorRect.left;
    const arrowY = indicatorCenterY + distance * Math.sin(angle) - indicatorRect.top;

    arrow.style.left = `${arrowX - 10}px`;
    arrow.style.top = `${arrowY - 10}px`;
    arrow.style.transform = `rotate(${angle + Math.PI / 2}rad)`;
});
