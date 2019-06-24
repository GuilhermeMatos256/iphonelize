(function () {
    'use strict';

    let usuario;

    function carregaDados(){
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        if(localStorage.idUsuario){
            usuario = usuarios[localStorage.idUsuario];
        }else{
            window.alert('Você precisa logar para acessar seu perfil!');
            window.location.href = '../../login.html';
        }
        
    }

    carregaDados();
    console.log(usuario);

})();