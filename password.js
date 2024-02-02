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
        secretKeys.forEach(sK => pwd = pwd.split('').map((c, i) => c+sK[i % sK.length]).join(''));
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
            const columnMatrixToString = mat => mat.map(c => String.fromCharCode(c % 92 + 35)).join('');
            const product = (m1, m2) => m1.map(row => m2[0].map((_, j) => row.reduce((acc, _, k) => acc + row[k] * m2[k][j], 0)));
            const stringToColumnMatrix = str => str.split('').map((_, i) => [str[i].charCodeAt()]);
            const stringToSquareMatrix = str => {
                const matSize = Math.ceil(Math.sqrt(str.length));
                return Array(matSize).fill(Array(matSize).fill()).map((row, i) => row.map((_, j) =>  str[(i*matSize + j) % str.length].charCodeAt()));
            }

            secretKeys.forEach(sK => {
                const sKMatrix = stringToSquareMatrix(sK);
                const tmp = pwd + pwd.slice(0, sKMatrix.length-pwd.length % sKMatrix.length);
                pwd = Array(tmp.length/sKMatrix.length).fill().map((_, i) =>
                    columnMatrixToString(product(sKMatrix, stringToColumnMatrix(tmp.slice(i*sKMatrix.length, (i+1)*sKMatrix.length))))).join('').slice(0, pwd.length);
            });
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
