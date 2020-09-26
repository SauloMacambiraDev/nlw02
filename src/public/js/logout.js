function logout() {
    const xhttp = new XMLHttpRequest();
    showLoadingAndBlackCover();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4) {
            hideLoadingAndBlackCover();
            if (this.status < 300){
                window.setTimeout(() => {
                    window.location.href = '/';
                }, 1)
                return
            }

            if (this.status < 500) {
                showDefaultAlert(response.message, 'failure');
                return 
            }

            if (this.status >= 500) {
                showDefaultAlert('Um erro ocorreu. Tente novamente em alguns segundos', 'failure');
                return
            }
        }
    }
    
    const url = `${window.location.origin}/logout`;
    xhttp.open('POST', url);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
}