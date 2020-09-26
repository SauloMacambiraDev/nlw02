
const createClassFormEl = document.querySelector('#create-class');

if (createClassFormEl){
    createClassFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();

        // axios.get('https://swapi.dev/api/planets/')
        // .then(data => console.log(data))
        // .catch(err => console.log(err))

        try{
            const loadingEl = document.querySelector('#loading-content');        
            const blackCoverEl = document.querySelector('.black-cover');        

            // console.log('1) display load on view page')
            showLoadingAndBlackCover();
            // console.log('2) Send post request to proffyController')

            const name = document.querySelector('#name').value;
            const avatar = document.querySelector('#avatar').value;
            const whatsapp = document.querySelector('#whatsapp').value;
            const bio = document.querySelector('#bio').value;

            const subjectEl = document.querySelector('#subject')
            const subjectId = subjectEl.options[subjectEl.selectedIndex].value;
            const cost = document.querySelector('#cost').value;

            let weekdays = [];
            let timeFroms = [];
            let timeTos = [];
            
            document.querySelectorAll('[name="weekday[]"]').forEach(selectEl => {
                weekdays.push(selectEl.options[selectEl.selectedIndex].value);
            })

            document.querySelectorAll('[name="time_from[]"]').forEach(timeFromEl => {
                timeFroms.push(timeFromEl.value);
            })

            document.querySelectorAll('[name="time_to[]"]').forEach(timeToEl => {
                timeTos.push(timeToEl.value);
            })


            const payload = {
                name,
                avatar,
                whatsapp,
                bio,
                subjectId,
                cost,
                weekdays,
                timeFroms,
                timeTos
            }
            console.log(payload);

            const response = await axios.post('/classes/save-class', payload);
            if (response.data.status === 'success') {
                hideLoadingAndBlackCover();
                showSuccessAlertNewProffy();
                window.setTimeout(() => {
                    window.location.href = `/study?subject=${subjectId}&weekday=${weekdays[0]}`
                }, 5000);
            }
            
            hideLoadingAndBlackCover();
        } catch(err) {
            hideLoadingAndBlackCover();
            showDefaultAlert('Não foi possível cadastrá-lo. Por favor, tente novamente', 'failure');
        }
    })
}