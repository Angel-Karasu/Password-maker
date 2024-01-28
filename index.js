function addPwdMadeField() {
    let passwordGenerated = document.querySelector('#website').parentElement.cloneNode(true);
    [
        {attribute:'id', value:'pwdMade'},
        {attribute:'placeholder', value: document.querySelector('#pwdMadeField h2').textContent},
        {attribute:'readOnly', value:true},
    ].forEach(elt => passwordGenerated.querySelector('input')[elt.attribute] = elt.value);

    passwordGenerated.querySelector('label').innerHTML = 'Length : <span>0</span>';
    passwordGenerated.querySelector('label').setAttribute('for', passwordGenerated.querySelector('input').id);

    document.querySelector('#pwdMadeField').appendChild(passwordGenerated);
}

function addInputButton() {
    const buttons = [
        {innerHTMLValue:'<i class="bi bi-eye"></i>', onclickValue:'showHide(this.parentElement.parentElement)'},
        {innerHTMLValue:'<i class="bi bi-clipboard"></i>', onclickValue:'copy(this.parentElement.parentElement)'},
    ].map(opt => {
        let btn = document.createElement('button');
        btn.className = 'inputBtn'
        btn.innerHTML = opt.innerHTMLValue;
        btn.setAttribute('onclick', opt.onclickValue);
        return btn;
    });
    
    Array.from(document.querySelectorAll('input[type="password')).forEach(input => {
        let div = document.createElement('div');
        div.className = 'inputBtns';
        buttons.forEach(btn => div.appendChild(btn));

        input.insertAdjacentElement('afterend', div);
        input.parentElement.outerHTML = input.parentElement.outerHTML;
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
        div.querySelector('.bi-eye-slash').className = div.querySelector('.bi-eye-slash').className.replace('-slash', '');
    }
}

function showHideAll(h1) {
    let eye = h1.querySelector('i');
    eye.className = h1.querySelector('.bi-eye-slash') ? eye.className.replace('-slash', '') : eye.className+'-slash';
    Array.from(document.querySelectorAll('input[type="'+(h1.querySelector('.bi-eye-slash') ? 'password':'text'))).forEach(input => showHide(input.parentElement));
}

function copy(div) {
    navigator.clipboard.writeText(div.querySelector('input').value);
    div.querySelector('.bi-clipboard').className += '-check-fill';
    setTimeout(() => 
        div.querySelector('.bi-clipboard-check-fill').className = 'bi bi-clipboard'
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