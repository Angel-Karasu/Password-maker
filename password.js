function generatePwd(websiteName, accountIdentifier, secretKeys, nonEncodedString, maxLength, method) {
    var pwd = '';

    function hasError() {
        const methodsAvailable = ['vigenere', 'matrix'];

        let alertMsg = 'You need to put :\n';
        if (!websiteName) alertMsg += '\t- the website name\n';
        if (!accountIdentifier) alertMsg += '\t- your account identifier\n';
        if (secretKeys < 1) alertMsg += '\t- at least a secret key\n';
        if (addString.length > maxLength && maxLength > 0) alertMsg += '\t- a non-encoded string shorter that the max length\n';
        if (!methodsAvailable.includes(method)) alertMsg += '\t- a method among '+methodsAvailable.join(' | ');
        
        if (alertMsg.split('\n').length > 2) {
            alert(alertMsg);
            return true;
        } return false;
    };
    
    function createPwd() {
        pwd =  websiteName + accountIdentifier;
        secretKeys.forEach(sK => pwd = pwd.split('').map((c, i) => c+sK[i % sK.length]).join('') + sK.slice(pwd.length));
    };
    
    function encodePwd() {
        function vigenere() {
            secretKeys.forEach(sK => 
                pwd = pwd.split('').map((c, i) => String.fromCharCode(
                    (c.charCodeAt() + i + sK[i % sK.length].charCodeAt()) % 92 + 35
                )).join('')
            );
        };

        function matrix() {
            const matrixSize = Math.ceil(Math.sqrt(pwd.length));

            function stringToMatrix(str) {
                return Array(matrixSize).fill(Array(matrixSize).fill()).map((row, i) => row.map((_, j) => str[(i*matrixSize + j) % str.length].charCodeAt()));
            };
            function multiplyMatrices(mat1, mat2) {
                return mat1.map(row => mat2[0].map((_, j) => row.reduce((acc, _, k) => acc + row[k] * mat2[k][j], 0)));
            };

            let pwdMatrix = stringToMatrix(pwd);
            secretKeys.forEach(sK => {
                const sKMatrix = stringToMatrix(sK);
                pwdMatrix = multiplyMatrices(sKMatrix, multiplyMatrices(pwdMatrix, sKMatrix)).map(row => row.map(c => c % 92 + 35));
            });

            pwd = pwdMatrix.map(row => row.map(c => String.fromCharCode(c)).join('')).join('').slice(0, pwd.length);
        };

        eval(method).call();
        pwd += nonEncodedString;
        if (pwd.length > maxLength) pwd = pwd.slice(-maxLength);
    }

    if (!hasError()) {
        createPwd();
        encodePwd();
    }
    return pwd;
};