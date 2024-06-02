function showModal(title, logoSrc, description, subtechnologies) {
    const modal = document.getElementById('techModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalLogo = document.getElementById('modalLogo');
    const modalDescription = document.getElementById('modalDescription');
    const modalSubtechList = document.getElementById('modalSubtechList');

    modalTitle.textContent = title;
    modalLogo.src = logoSrc;
    modalDescription.textContent = description;
    modalSubtechList.innerHTML = '';

    subtechnologies.forEach(subtech => {
        const li = document.createElement('li');
        li.textContent = subtech;
        modalSubtechList.appendChild(li);
    });

    // Remove any previous logo class
    modalLogo.className = '';

    // Add appropriate class for logo styling
    switch (title) {
        case "Excel":
            modalLogo.classList.add('logo-excel-modal');
            break;
        case "Python":
            modalLogo.classList.add('logo-python-modal');
            break;
        case "SQL":
            modalLogo.classList.add('logo-sql-modal');
            break;
        case "Power BI":
            modalLogo.classList.add('logo-powerbi-modal');
            break;
        default:
            break;
    }

    modal.style.display = 'block';
}

// Close modal
const modal = document.getElementById('techModal');
const span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
