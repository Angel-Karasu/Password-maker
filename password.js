function generatePwd(websiteName, accountIdentifier, secretKeys, nonEncodedString, maxLength) {
    var pwd = '';

    function hasError() {
        let alertMsg = 'You need to put :\n';
        if (!websiteName) alertMsg += '\t- the website name\n';
        if (!accountIdentifier) alertMsg += '\t- your account identifier\n';
        if (secretKeys < 1) alertMsg += '\t- a secret key\n';
        if (addString.length > maxLength && maxLength > 0) alertMsg += '\t- a non-encoded string shorter that the max length\n';
        
        if (alertMsg.split('\n').length > 2) {
            alert(alertMsg);
            return true;
        } return false;
    }
    
    function createPwd() {
        pwd =  websiteName + accountIdentifier;
        secretKeys.forEach(sK => pwd = pwd.split('').map((c, i) => c+sK[i % sK.length]).join('') + sK.slice(pwd.length));
    }
    
    function encodePwd() {
        secretKeys.forEach(sK => 
            pwd = pwd.split('').map((c, i) => String.fromCharCode(
                (c.charCodeAt() + i + sK[i % sK.length].charCodeAt()) % 92 + 35
            )).join('')
        );
        pwd += nonEncodedString;

        if (pwd.length > maxLength) pwd = pwd.slice(-maxLength);
    }

    if (!hasError()) {
        createPwd();
        encodePwd();
    }
    return pwd;
}

function makePwd() {
    const pwd = generatePwd(
        document.querySelector('#website').value,
        document.querySelector('#account').value,
        Array.from(document.querySelectorAll('.secretKey')).map(sK => sK.querySelector('input').value).filter(sK => sK),
        document.querySelector('#addString').value,
        document.querySelector('#maxLength').value
    );

    if (pwd) {
        document.querySelector('#pwdMade').value = pwd;
        document.querySelector('span').textContent = pwd.length;
        document.querySelector('#pwdMade').classList.add('green');
        setTimeout(() => document.querySelector('#pwdMade').classList.remove('green'), 500);
    } else {
        Array.from(document.querySelectorAll('input[value=""]')).forEach(input => {
            input.classList.add('red');
            setTimeout(() => input.classList.remove('red'), 1000);
        });
    };

}
