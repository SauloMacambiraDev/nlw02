function showLoading() {
    const loadingEl = document.querySelector('#loading-content');
    if (loadingEl) loadingEl.style.display =  'block';
}

function hideLoading() {
    const loadingEl = document.querySelector('#loading-content');
    if (loadingEl) loadingEl.style.display =  'none';
}

function showBlackCover() {
    const blackCoverEl = document.querySelector('.black-cover'); 
    if ( blackCoverEl) blackCoverEl.style.display = 'block';
}

function hideBlackCover() {
    const blackCoverEl = document.querySelector('.black-cover'); 
    if ( blackCoverEl) blackCoverEl.style.display = 'none';
}

function showLoadingAndBlackCover() {
    const loadingEl = document.querySelector('#loading-content');
    const blackCoverEl = document.querySelector('.black-cover');
    if (loadingEl && blackCoverEl) {
        loadingEl.style.display =  'block';
        blackCoverEl.style.display = 'block';
    }
}

function hideLoadingAndBlackCover() {
    const loadingEl = document.querySelector('#loading-content');
    const blackCoverEl = document.querySelector('.black-cover');
    if (loadingEl && blackCoverEl) {
        loadingEl.style.display =  'none';
        blackCoverEl.style.display = 'none';
    }
}