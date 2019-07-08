(function () {
    'use strict';
    $(document).ready(function () {

        let $$ = function (id) {
            return document.getElementById(id);
        };

        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        let usuario;

        (function (){
            if(localStorage.idUsuario){
                window.alert('Você ja esta logado!');
                window.location.href = '../redireciona-perfil.html';
            }
        })();

        let verificaDados = (email, senha) => {
            for (let usr of usuarios) {
                console.log(usr);
                console.log(email);
                console.log(senha);
                if (email === usr.email && senha === usr.senha)
                    return usr.idUsuario;
            }

            return -1;
        };

        document.forms[0].onsubmit = function (event) {
            event.preventDefault();
            let email = $$('input-email').value;
            let senha = $$('input-password').value;

            let id = verificaDados(email, senha);

            if (id >= 0) {
                localStorage.idUsuario = id;
                usuario = usuarios[id];
                console.log(usuario);
                window.alert('Login Efetuado com sucesso!!');
                window.location.href = '../../perfil.html';
            } else {
                window.alert('Email ou senha incorreta!! favor tentar novamente');
                $$('input-password').value = '';
                return 0;
            }

        };

    });
})();