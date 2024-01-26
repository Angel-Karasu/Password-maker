function generatePassword() {
    const secretKeys = Array.from(document.querySelectorAll('.secretKey')).map(sK => sK.querySelector('input').value).filter(sK => sK);
    if (!secretKeys.length) {
        alert('Put a secret key');
        return;
    }
    var pwd = '';
    
    function createPwd() {
        pwd = document.querySelector('#website').value + document.querySelector('#account').value;
        secretKeys.forEach(sK => pwd = pwd.split('').map((c, i) => c+sK[i % sK.length]).join('') + sK.slice(pwd.length));
    }
    
    function encodePwd() {
        secretKeys.forEach(sK => 
            pwd = pwd.split('').map((c, i) => String.fromCharCode(
                (c.charCodeAt() + i + sK[i % sK.length].charCodeAt()) % 92 + 35
            )).join('')
        );
        [['A', 'upercase'], ['ng', 'lowercase'], ['€', 'special_character'], ['1', 'number']].forEach(elt => 
            pwd += elt[0].repeat(document.querySelector('#'+elt[1]).checked));

        if (pwd.length > document.querySelector('#maxLength').value) pwd = pwd.slice(-document.querySelector('#maxLength').value);
    }

    createPwd();
    encodePwd();
    document.querySelector('#passwordGenerated').value = pwd;
    document.querySelector('span').textContent =
        document.querySelector('span').textContent.split(' ')[0]+` ${pwd.length}`;
}