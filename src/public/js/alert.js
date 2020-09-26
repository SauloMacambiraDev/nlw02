function hideDefaultAlert() {
    const alertEl = document.querySelector('.alert-message');
    if (alertEl) alertEl.parentElement.removeChild(alertEl);
}

function showDefaultAlert(message, option) {
    hideDefaultAlert()

    const bodyEl = document.querySelector('body');
    if (bodyEl) {
        const alertEl = `
            <div class="alert-message alert--${option}">
                ${message}
            </div>"
        `;

        bodyEl.insertAdjacentHTML('afterbegin', alertEl);
        window.setTimeout(() => {
            hideDefaultAlert();
        }, 5000);
    }
}

function showSuccessAlertNewProffy() {
    const alertSuccessEl = document.querySelector('#alert-container');
    if (alertSuccessEl) {
        const bodyEl = document.querySelector('body');
        bodyEl.pointerEvents = "none";
        alertSuccessEl.style.display = 'block';
        window.setTimeout(() => bodyEl.pointerEvents = "none", 1000);
        bodyEl.pointerEvents = "auto";
    }
}

function goToStudyPage() {
    window.location.href = `/study`
}