function update_secret_key_ID(id) {
    let secret_keys = document.querySelectorAll('.secret-key');
    Array.from(secret_keys).slice(id).forEach((sK, i) => {
        let input = sK.querySelector('input');
        input.placeholder = input.placeholder.split(' ').slice(0,2).join(' ')+' '+(id+i)
    });
    secret_keys[1].querySelector('.remove').style.visibility = secret_keys.length < 3 ? 'hidden':'';
}

function add_secret_key() {
    let secret_key = document.querySelector('.secret-key').cloneNode(true);
    secret_key.style.display = '';
    document.querySelector('#secret-keys').appendChild(secret_key);
    update_secret_key_ID(document.querySelectorAll('.secret-key').length - 1);
}

function display(div) {
    if (div.querySelector('input').type == 'password') {
        div.querySelector('input').type = 'text';
        div.querySelector('.bi-eye').className += '-slash'
    } else {
        div.querySelector('input').type = 'password';
        div.querySelector('.bi-eye-slash').className = div.querySelector('.bi-eye-slash').className.replace('-slash', '');
    }
}

function copy(div) {
    navigator.clipboard.writeText(div.querySelector('input').value);
    div.querySelector('.bi-clipboard').className += '-check-fill';
    setTimeout(() => 
        div.querySelector('.bi-clipboard-check-fill').className = 'bi bi-clipboard'
    , 500)
}

function remove_secret_key(secret_key) {
    const id = Array.from(document.querySelectorAll('.secret-key')).indexOf(secret_key);
    secret_key.remove()
    update_secret_key_ID(id);
}

function make_password() {
    const pwd = generate_password(
        document.querySelector('#website').value,
        document.querySelector('#account').value,
        Array.from(document.querySelectorAll('.secret-key')).map(sK => sK.querySelector('input').value).filter(sK => sK),
        document.querySelector('#non-encoded-string').value,
        document.querySelector('#max-length').value,
        document.querySelector('#method').value
    );

    if (pwd) {
        document.querySelector('#password').value = pwd;
        document.querySelector('span').textContent = pwd.length;
        document.querySelector('#password').classList.add('green');
        setTimeout(() => document.querySelector('#password').classList.remove('green'), 500);
    } else {
        Array.from(document.querySelectorAll('input[value=""]')).forEach(input => {
            input.classList.add('red');
            setTimeout(() => input.classList.remove('red'), 1000);
        });
    };

};

window.onload = () => {
    for(let i=0; i<3; i++) add_secret_key();
}