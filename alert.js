function createAlert(message) {
    const DOMString = `
    <div class="alert alert-warning alert-dismissible fade show fixed-top mx-auto my-5" role="alert">
    <strong>An error occured!</strong> ${message}.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    return document.createRange().createContextualFragment(DOMString);
}



export default function showAlert(message) {
    document.body.appendChild(createAlert(message));
    setTimeout(() => {
        document.querySelector(".btn-close").click();
    }, 10000);
}

