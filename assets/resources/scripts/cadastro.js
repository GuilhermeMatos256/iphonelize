(function () {
    'use strict';
    //falta colocar mensagens customizadas de erro, conferir as senhas e afins
    $('#input-cpf').mask('000.000.000-00');
    $('#input-cep').mask('00000-000');
    $('#input-telefone').mask('(00) 00000-0000');

    let dataAtual = new Date();

    let dataAtualStr = function () {
        return dataAtual.getFullYear() + '-' + dataAtual.getMonth() + '-' + dataAtual.getDay();
    };

    let $$ = function (id) {
        return document.getElementById(id);
    };

    let Usuario = function (idUsuario, tipo, dataRegistro, nome, sobrenome, dataNascimento, genero,
        email, senha, cpf, numeroTel, cep, estado, cidade, bairro, rua, numero) {

        this.idUsuario = idUsuario;
        this.tipo = tipo;
        this.dataRegistro = dataRegistro;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.numeroTel = numeroTel;
        this.cep = cep;
        this.estado = estado;
        this.cidade = cidade;
        this.bairro = bairro;
        this.rua = rua;
        this.numero = numero;

        this.getIdade = function () {
            let strs = dataNascimento.split('/');
            let dataNasc = new Date();
            dataNasc.setFullYear(strs[0]);
            dataNasc.setMonth(strs[1]);
            dataNasc.setDate(strs[2]);

            let dataAux = new Date();
            dataAux.setDate(dataAtual.getTime() - dataNasc.getTime());

            return parseInt(dataAux.getFullYear());
        };
    };

    let usuarios;
    if (localStorage.getItem('usuarios')) {
        usuarios = JSON.parse(localStorage.getItem('usuarios'));
    } else {
        usuarios = [];
    }

    function update(novoUsuario) {
        usuarios.push(novoUsuario);
        localStorage.qtdUsuarios = usuarios.length;
        localStorage.usuarios = JSON.stringify(usuarios);

        console.log(usuarios);
    }

    $$('form-cadastro').onsubmit = function (event) {
        event.preventDefault();

        let tipo = 'cliente';
        let nome = $$('input-nome').value;
        let sobrenome = $('#input-sobrenome').val();
        let dataNascimento = $('#input-data').val();
        let genero = $('input[name="genero"]:checked +span').text();
        let email = $('#input-email').val();
        let senha = $('#input-senha').val();
        let cpf = $('#input-cpf').val();
        let numeroTel = $('#input-telefone').val();
        let cep = $('#input-cep').val();
        let estado = $('#input-estado').val();
        let cidade = $('#input-cidade').val();
        let bairro = $('#input-bairro').val();
        let rua = $('#input-rua').val();
        let numero = $('#input-numero').val();

        let novoUsuario = new Usuario(usuarios.length, tipo, dataAtualStr(), nome, sobrenome,
            dataNascimento, genero, email, senha, cpf, numeroTel, cep, estado, cidade, bairro,
            rua, numero);

        update(novoUsuario);
        window.alert('Cadastro efetuado com sucesso!!');
        window.location.href = '../../login.html';
    };


    let inputNome = $$('input-nome');
    let inputSobrenome = $$('input-sobrenome');

    inputNome.addEventListener('invalid', function () {
        if (inputNome.validity.patternMismatch) {
            this.setCustomValidity('Nome Invalido!, Favor Digitar um nome valido.');
        } else if (inputNome.validity.valueMissing) {
            this.setCustomValidity('Favor Digitar seu nome.');
        } else {
            this.setCustomValidity('');
        }

    });

    inputSobrenome.oninvalid = function () {
        console.log('foi');
        if (inputSobrenome.validity.patternMismatch) {
            this.setCustomValidity('Sobrenome Invalido!, Favor Digitar um Sobrenome Valido.');
        } else {
            this.setCustomValidity('');
        }

        if (inputSobrenome.validity.valueMissing) {
            this.setCustomValidity('Favor Digitar seu Sobrenome.');
        } else {
            this.setCustomValidity('');
        }
    };

})();