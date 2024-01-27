function addPwdMadeField() {
    let passwordGenerated = document.querySelector('#website').parentElement.cloneNode(true);
    [
        {attribute:'id', value:'pwdMade'},
        {attribute:'placeholder', value: document.querySelector('#pwdMadeField h2').textContent},
        {attribute:'readOnly', value:true},
        {attribute:'type', value:'password'},
    ].forEach(elt => passwordGenerated.querySelector('input')[elt.attribute] = elt.value);

    passwordGenerated.querySelector('label').innerHTML = 'Length : <span>0</span>';
    passwordGenerated.querySelector('label').setAttribute('for', passwordGenerated.querySelector('input').id);

    document.querySelector('#pwdMadeField').appendChild(passwordGenerated);
}

function addInputButton() {
    const buttons = [
        {innerHTMLValue:'<i class="bi bi-clipboard"></i>', onclickValue:'copy(this.parentElement)'},
        {innerHTMLValue:'<i class="bi bi-eye-slash"></i>', onclickValue:'showHide(this.parentElement)'},
    ].map(opt => {
        let btn = document.createElement('button');
        btn.className = 'inputBtn'
        btn.innerHTML = opt.innerHTMLValue;
        btn.setAttribute('onclick', opt.onclickValue);
        return btn;
    });
    
    Array.from(document.querySelectorAll('input')).forEach(input => {
        buttons.forEach(btn => input.insertAdjacentElement('afterend', btn));
        input.parentElement.outerHTML = input.parentElement.outerHTML.replace('-slash', input.type == 'password' ? '':'-slash');
    });
}

function updateSecretKeyID(id) {
    let secretKeys = document.querySelectorAll('.secretKey');
    Array.from(secretKeys).slice(id).forEach((sK, i) => {
        let input = sK.querySelector('input');
        input.placeholder = input.placeholder.split(' ').slice(0,2).join(' ')+' '+(id+i)
    });
    secretKeys[1].querySelector('.removeBtn').style.visibility = secretKeys.length < 3 ? 'hidden':'';
}

function addSecretKey() {
    let secretKey = document.querySelector('.secretKey').cloneNode(true);
    secretKey.style.display = '';
    document.querySelector('#secretKeys').appendChild(secretKey);
    updateSecretKeyID(document.querySelectorAll('.secretKey').length - 1);
}

function showHide(div) {
    if (div.querySelector('input').type == 'password') {
        div.querySelector('input').type = 'text';
        div.querySelector('.bi-eye').className += '-slash'
    } else {
        div.querySelector('input').type = 'password';
        div.outerHTML = div.outerHTML.replace('-slash', '');
    }
}

function copy(div) {
    navigator.clipboard.writeText(div.querySelector('input').value);
    div.querySelector('.bi-clipboard').className += '-check-fill';
    setTimeout(() => 
        div.outerHTML = div.outerHTML.replace('-check-fill', '')
    , 500)
}

function removeSecretKey(secretKey) {
    const id = Array.from(document.querySelectorAll('.secretKey')).indexOf(secretKey);
    secretKey.remove()
    updateSecretKeyID(id);
}

window.onload = () => {
    addPwdMadeField();
    addInputButton();
    for(let i=0; i<3; i++) addSecretKey();
}