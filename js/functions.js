export function showToast(title, message, autohide, delay){
    if(!delay)
        delay = 2000;

    if(!autohide)
        autohide = false;

    const div = document.createElement("div");
    div.innerHTML = 
        `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" style="position: absolute; top: 1rem; z-index:999; font-weight: bold; backdrop-filter: blur(10px);" data-bs-autohide=${autohide} data-delay=${delay}">
            <div class="toast-header">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" style="white-space: pre-line;">
                ${message}
            </div>
        </div>`;

    const toast = div.firstChild;
    document.body.appendChild(toast);
    new bootstrap.Toast(toast).show();

    toast.addEventListener('hidden.bs.toast', function () {
        document.body.removeChild(toast);
      })
}