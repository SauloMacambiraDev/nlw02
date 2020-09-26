const formEl = document.querySelector('#create-student');

if (formEl) formEl.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    const payload = {
        name,
        email,
        password,
        confirmPassword
    };

    showLoadingAndBlackCover();
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            hideLoadingAndBlackCover();
            const response = JSON.parse(this.responseText);
            console.log(this.status);
            console.log(response);


            if( this.status < 300 ){
                showDefaultAlert(response.message, 'success');
                window.setTimeout(() => window.location.href = '/', 5000);
                return
            }

            if (this.status < 500){
                showDefaultAlert(response.message, 'failure');
                return
            }

            if (this.status >= 500) {
                showDefaultAlert('Um erro ocorreu. Tente novamente em alguns segundos', 'failure')
                return
            }
        }
    }
    console.log(JSON.stringify(payload));
    xhttp.open('POST', '/signup', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(payload));

});