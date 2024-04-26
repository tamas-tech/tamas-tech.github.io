function kuldes(elem) {
    var message = elem.nextElementSibling.innerText
    window.parent.postMessage(message, '*');
};