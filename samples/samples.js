function kuldes(elem) {
    var message = elem.nextElementSibling.innerText;
    console.log(message)
    window.parent.postMessage(message, '*');
};