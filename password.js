function generatePwd(websiteName, accountIdentifier, secretKeys, nonEncodedString, maxLength) {
    var pwd = '';
    
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

    createPwd();
    encodePwd();

    return pwd;
}

function makePwd() {
    const secretKeys = Array.from(document.querySelectorAll('.secretKey')).map(sK => sK.querySelector('input').value).filter(sK => sK);
    if (!secretKeys.length) {
        alert('Put a secret key');
        return;
    }
    const addString = document.querySelector('#addString').value;
    let maxLength = document.querySelector('#maxLength');
    maxLength = maxLength.value.match(maxLength.pattern)[0];
    if (addString.length > maxLength && maxLength > 0) {
        alert('Reduce the non-encoded string or increase the max length');
        return;
    }

    const pwd = generatePwd(
        document.querySelector('#website').value,
        document.querySelector('#account').value,
        secretKeys,
        addString,
        maxLength
    );

    document.querySelector('#pwdMade').value = pwd;
    document.querySelector('span').textContent = pwd.length;
}
