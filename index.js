function updateSecretKeyID(id) {
    let secretKeys = document.querySelectorAll('.secretKey');
    for (let i=id; i < secretKeys.length; i++)
        secretKeys[i].querySelector('input').placeholder = secretKeys[i].querySelector('input').placeholder.split(' ').slice(0,2).join(' ')+' '+i;
    secretKeys[1].querySelector('.removeBtn').style.visibility = 'hidden'.repeat(secretKeys.length < 3);
}

function addSecretKey() {
    let secretKey = document.querySelector('.secretKey').cloneNode(true);
    secretKey.style.display = '';
    document.querySelector('#secretKeys').appendChild(secretKey);
    updateSecretKeyID(document.querySelectorAll('.secretKey').length - 1);
}

function showHidePassword(div) {
    div.querySelector('input').type = div.querySelector('input').type == 'text' ? 'password' : 'text';
}

function copyPassword(div) {
    navigator.clipboard.writeText(div.querySelector('input').value);
}

function removeSecretKey(secretKey) {
    const id = Array.from(document.querySelectorAll('.secretKey')).indexOf(secretKey);
    secretKey.remove()
    updateSecretKeyID(id);
}