export function showToast(title, message, autohide, delay){
    if(!delay)
        delay = 2000;

    if(!autohide)
        autohide = false;

    const div = document.createElement("div");
    div.innerHTML = 
        `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"  style="position: absolute; top: 1rem; z-index:999; font-weight: bold;" data-autohide=${autohide} data-delay=${delay}>
            <div class="toast-header">
        
            <strong class="mr-auto">${title}</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="toast-body" style="white-space: pre-line;">
                ${message}
            </div>
        </div>`;

    const toast = div.firstChild;
    document.body.appendChild(toast);
    $(toast).toast("show");

    $(toast).on('hidden.bs.toast', function () {
        document.body.removeChild(toast);
      })
}