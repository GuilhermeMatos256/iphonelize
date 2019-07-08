(function () {
    'use strict';

    let usuario;

    function carregaDados() {
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        if (localStorage.idUsuario) {
            usuario = usuarios[localStorage.idUsuario];
        } else {
            window.alert('Você precisa logar para acessar seu perfil!');
            window.location.href = '../../login.html';
        }

    }

    carregaDados();

    window.onload = function () {
        function showDados() {
            console.log(usuario.nome);
            $('#nome-field').text(usuario.nome);
            $('#sobrenome-field').text(usuario.sobrenome);
            $('#email-field').text(usuario.email);
            $('#sexo-field').text(usuario.genero);
            $('#data-nascimento-field').text(usuario.dataNascimento);
            $('#data-cadastro-field').text(usuario.dataRegistro);
            $('#cpf-field').text(usuario.cpf);
            $('#cep-field').text(usuario.cep);
            $('#telefone-field').text(usuario.numeroTel);
            $('#pais-field').text('Brasil');
            $('#estado-field').text(usuario.estado);
            $('#cidade-field').text(usuario.cidade);
            $('#rua-field').text(usuario.rua);
            $('#numero-field').text(usuario.numero);
        }
        showDados();

        function logoff(){
            if(window.confirm('Você tem certeza que deseja sair?')){
                localStorage.removeItem('idUsuario');
                window.location.href = '../../login.html';
            }
        }

        $('#botao-sair').on('click',logoff);
        console.log(usuario);
    };
})();