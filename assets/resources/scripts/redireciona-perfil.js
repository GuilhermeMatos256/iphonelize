(function () {
    'use strict';
    let counter = 5;
    let chave;

    function redireciona() {
        counter--;
        $('h3 >span').text(counter);
        if (counter < 1) {
            clearInterval(chave);
            window.location.href = '../../perfil.html';
        }
    }
    chave = setInterval(redireciona, 1000);
})();