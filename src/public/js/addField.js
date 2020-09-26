const closeField = (e) => {
    let scheduleItemEl = e.parentNode;
    scheduleItemEl.parentNode.removeChild(scheduleItemEl);
}

const cloneField = () => {
    // .cloneNode(true) return the entire element and its children (descendentes)
    // if false, will only return the specific element found by querySelector
    let newScheduleItemEl = document.querySelector('.schedule-item').cloneNode(true);

    const closeElement = `
    <img class="close-btn" src="/images/icons/close.svg" alt="Close" onclick=closeField(this)>
    `

    newScheduleItemEl.insertAdjacentHTML('afterbegin', closeElement)
    
    // cleaning fields
    const fields = newScheduleItemEl.querySelectorAll('input')
    fields.forEach(field => {
        field.value = ''
    })

    let scheduleItemsEl = document.querySelector('#schedule-items')
    scheduleItemsEl.appendChild(newScheduleItemEl)

}

let btnNewField = document.querySelector('#add-time');

btnNewField.addEventListener('click', cloneField);
