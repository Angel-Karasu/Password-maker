function generate_password(website_name, account_identifier, secret_keys, non_encoded_string, max_length, method) {
    var pwd = '';

    function has_error() {
        const methods_available = ['vigenere', 'matrix'];

        let alert_msg = 'You need to put :\n';
        if (!website_name) alert_msg += '\t- the website name\n';
        if (!account_identifier) alert_msg += '\t- your account identifier\n';
        if (secret_keys < 1) alert_msg += '\t- at least a secret key\n';
        if (non_encoded_string.length > max_length && max_length > 0) alert_msg += '\t- a non-encoded string shorter that the max length\n';
        if (!methods_available.includes(method)) alert_msg += '\t- a method among '+methods_available.join(' | ');
        
        if (alert_msg.split('\n').length > 2) {
            alert(alert_msg);
            return true;
        } return false;
    };
    
    function create_password() {
        pwd =  website_name + account_identifier;
        secret_keys.forEach(sK => pwd = pwd.split('').map((c, i) => c+sK[i % sK.length]).join(''));
    };
    
    function encode_password() {
        function vigenere() {
            secret_keys.forEach(sK => 
                pwd = pwd.split('').map((c, i) => String.fromCharCode(
                    (c.charCodeAt() + i + sK[i % sK.length].charCodeAt()) % 92 + 35
                )).join('')
            );
        };

        function matrix() {
            const column_matrix_to_string = mat => mat.map(c => String.fromCharCode(c % 92 + 35)).join('');
            const product = (m1, m2) => m1.map(row => m2[0].map((_, j) => row.reduce((acc, _, k) => acc + row[k] * m2[k][j], 0)));
            const string_to_column_matrix = str => str.split('').map((_, i) => [str[i].charCodeAt()]);
            const string_to_square_matrix = str => {
                const matrix_size = Math.ceil(Math.sqrt(str.length));
                return Array(matrix_size).fill(Array(matrix_size).fill()).map((row, i) => row.map((_, j) =>  str[(i*matrix_size + j) % str.length].charCodeAt()));
            }

            secret_keys.forEach(sK => {
                const sK_matrix = string_to_square_matrix(sK);
                const tmp = pwd + pwd.slice(0, sK_matrix.length-pwd.length % sK_matrix.length);
                pwd = Array(tmp.length/sK_matrix.length).fill().map((_, i) =>
                    column_matrix_to_string(product(sK_matrix, string_to_column_matrix(tmp.slice(i*sK_matrix.length, (i+1)*sK_matrix.length))))).join('').slice(0, pwd.length);
            });
        };

        eval(method).call();
        pwd += non_encoded_string;
        if (pwd.length > max_length) pwd = pwd.slice(-max_length);
    }

    if (!has_error()) {
        create_password();
        encode_password();
    }
    return pwd;
};
