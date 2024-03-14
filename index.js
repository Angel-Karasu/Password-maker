import generate_password from "./password.js";

function update_secret_key_ID(id) {
    let secret_keys = document.querySelectorAll('.secret-key');
    Array.from(secret_keys).slice(id).forEach((sK, i) => {
        let input = sK.querySelector('input');
        input.id = input.id.split('-').slice(0,2).join('-')+'-'+(id+i);
        input.placeholder = input.placeholder.split(' ').slice(0,2).join(' ')+' '+(id+i);
    });
    secret_keys[1].querySelector('.remove-button').style.visibility = secret_keys.length < 3 ? 'hidden':'';
}

function add_input_buttons(input) {
    let div = document.createElement('div');
    div.className = 'input-buttons';

    let input_buttons = Array(2).fill().map(() => {
        let button = document.createElement('button');
        button.className = 'input-button';
        button.innerHTML = '<i class="bi"></i>';
        return button;
    });

    input_buttons[0].addEventListener('click', () => display(input.parentElement));
    input_buttons[0].querySelector('i').classList.add('bi-eye');

    input_buttons[1].addEventListener('click', () => copy(input.parentElement));
    input_buttons[1].querySelector('i').classList.add('bi-clipboard');

    input_buttons.forEach(button => div.appendChild(button))

    input.insertAdjacentElement('afterend', div);
}

function add_secret_key() {
    let secret_key = document.querySelector('.secret-key').cloneNode(true);
    secret_key.style.display = '';
    add_input_buttons(secret_key.querySelector('input'));
    secret_key.querySelector('.remove-button').addEventListener('click', e => remove_secret_key(e.target.parentElement));
    document.querySelector('#secret-keys').appendChild(secret_key);
    update_secret_key_ID(document.querySelectorAll('.secret-key').length - 1);
}

function remove_secret_key(secret_key) {
    const id = Array.from(document.querySelectorAll('.secret-key')).indexOf(secret_key);
    secret_key.remove()
    update_secret_key_ID(id);
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
    document.querySelector('#add-secret-key').addEventListener('click', add_secret_key);
    document.querySelector('#make-password-button').addEventListener('click', make_password);
    add_input_buttons(document.querySelector('#password'));

    Array(3).fill().forEach(add_secret_key);
}