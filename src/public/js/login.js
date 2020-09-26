const formEl = document.querySelector('form');

if (formEl) {
    formEl.addEventListener('submit', e => {
        e.preventDefault();
        
        try{
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const rememberme = document.querySelector('#rememberme').checked;

            const payload = {
                email,
                password,
                rememberme
            };
            
            const httpx = new XMLHttpRequest();
            httpx.onreadystatechange = function(){
                if ( this.readyState == 4 ){
                    hideLoadingAndBlackCover();
                    if (this.status == 200){
                        const response = JSON.parse(this.responseText);
                        showDefaultAlert(response.message, 'success');
                        
                        window.setTimeout(() => {
                            
                            window.location.href = `${window.location.origin}/study`
                        }, 5000);
                    } else {
                        if (this.status < 500){
                            const response = JSON.parse(this.responseText);   
                            showDefaultAlert(response.message, 'failure');
                        }
                        if (this.status >= 500) showDefaultAlert('Um erro ocorreu. Tente novamente em alguns segundos', 'failure');
                    }
                }
            }

            const url = `${window.location.origin}/signin`;
            httpx.open('POST', url, true);
            httpx.setRequestHeader('Content-Type', 'application/json');
            showLoadingAndBlackCover();
            httpx.send(JSON.stringify(payload))

        } catch(err) {
            showDefaultAlert('Um erro ocorreu ao tentar fazer login. Tente novamente mais tarde.', 'failure');
        }

    })
}