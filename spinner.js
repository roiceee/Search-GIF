function createSpinner() {
    return new Promise(resolve => {
        const DOMString = `
    <div class="spinner-border text-light" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`
    resolve(document.createRange().createContextualFragment(DOMString));
    })
}

function removeSpinner() {
    const spinner = document.querySelector('.spinner-border');
    spinner.remove();
}


export {createSpinner, removeSpinner};

