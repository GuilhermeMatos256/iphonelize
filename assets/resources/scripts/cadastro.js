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
    }

    let inputSenha = $('#input-senha');
    let inputConfirmSenha = $('#input-confirm-senha');

    let verificaConfirm = function () {
        if (inputSenha.val()) {
            if (inputConfirmSenha.val() !== inputSenha.val()) {
                $('#card-senha').removeClass('hide');
                inputConfirmSenha.addClass('invalid');
                inputConfirmSenha.removeClass('valid');
                return false;
            } else {
                $('#card-senha').addClass('hide');
                inputConfirmSenha.removeClass('invalid');
                return true;
            }
        }
    };


    $$('form-cadastro').onsubmit = function (event) {
        event.preventDefault();
        if (verificaConfirm() === false) {
            inputConfirmSenha.focus();
            return false;
        }

        let tipo = 'cliente';
        let nome = $$('input-nome').value;
        let sobrenome = $('#input-sobrenome').val();
        let dataNascimento = $('#input-data').val();
        let genero = $('input[name="genero"]:checked +span').text();
        let email = $('#inputEmail').val();
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
    let inputData = document.querySelector('#input-data');
    let inputGenero = document.getElementsByName('genero');
    let inputCpf = $('#input-cpf');
    let inputTelefone = $('#input-telefone');
    let inputCep = $('#input-cep');
    let inputCidade = $('#input-cidade');
    let inputBairro = $('#input-bairro');
    let inputRua = $('#input-rua');
    let inputNumero = $('#input-numero');


    inputNome.addEventListener('invalid', function () {
        if (inputNome.validity.patternMismatch) {
            this.setCustomValidity('Nome Invalido!, Favor Digitar um nome valido.');
        } else if (inputNome.validity.valueMissing) {
            this.setCustomValidity('Favor Digitar seu nome.');
        } else {
            this.setCustomValidity('');
        }

    });

    inputSobrenome.onblur = function () {
        if (inputSobrenome.validity.patternMismatch) {
            this.setCustomValidity('Sobrenome Invalido!, Favor Digitar um nome valido.');
        } else if (inputSobrenome.validity.valueMissing) {
            this.setCustomValidity('Favor Digitar seu Sobrenome.');
        } else {
            this.setCustomValidity('');
        }
    };

    function validacaoData() {
        if (inputData.validity.rangeOverflow) {
            inputData.setCustomValidity('Você não possui a idade minima!');
        } else if (inputData.validity.valueMissing) {
            inputData.setCustomValidity('Por favor informe sua data de nascimento');
        } else {
            inputData.setCustomValidity('');
        }
    }
    inputData.addEventListener('invalid', validacaoData); 

    inputGenero[0].addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            inputGenero[0].setCustomValidity('Por favor informe seu genero');
        } else {
            inputGenero[0].setCustomValidity('');
        }
    });

    document.forms[0].inputEmail.oninvalid = function (event) {
        console.log('evento do tipo: ' + event.type);
        if (this.validity.patternMismatch) {
            this.setCustomValidity('Email Invalido!, Favor Digitar um Email valido.');
        } else if (this.validity.valueMissing) {
            this.setCustomValidity('Favor Digitar seu Email.');
        } else {
            this.setCustomValidity('');
        }
    };

    inputSenha.on('invalid', function () {
        if (this.validity.patternMismatch) {
            this.setCustomValidity('Senha Muito Curta, Favor Digitar uma Maior.');
        } else if (this.validity.valueMissing) {
            this.setCustomValidity('Favor Digitar uma Senha');
        } else {
            this.setCustomValidity('');
        }
    });

    inputConfirmSenha.on('keyup', function () {
        verificaConfirm();
    });
    inputConfirmSenha.on('blur', function () {
        verificaConfirm();
    });
    inputConfirmSenha.on('invalid', function (e) {
        e.preventDefault();
    });

    inputCpf.on('invalid', function () {
        if (this.validity.patternMismatch) {
            inputCpf.addClass('invalid');
            inputCpf.removeClass('valid');
            this.setCustomValidity('CPF Invalido!, Favor Digitar um CPF valido.');
        } else if (this.validity.valueMissing) {
            inputCpf.addClass('invalid');
            inputCpf.removeClass('valid');
            this.setCustomValidity('Favor Digitar seu CPF.');
        } else {
            inputCpf.removeClass('invalid');
            inputCpf.addClass('valid');
            this.setCustomValidity('');
        }
    });

    inputTelefone.on('invalid', function () {
        if (this.validity.patternMismatch) {
            inputTelefone.addClass('invalid');
            inputTelefone.removeClass('valid');
            this.setCustomValidity('Numero de Telefone Invalido!, ' +
                'Favor Digitar um Numero de Telefone Valido.');
        } else if (this.validity.valueMissing) {
            inputTelefone.addClass('invalid');
            inputTelefone.removeClass('valid');
            this.setCustomValidity('Favor Digitar seu Numero de Telefone.');
        } else {
            inputTelefone.removeClass('invalid');
            inputTelefone.addClass('valid');
            this.setCustomValidity('');
        }
    });

    inputCep.on('invalid', function () {
        if (this.validity.patternMismatch) {
            inputCep.addClass('invalid');
            inputCep.removeClass('valid');
            this.setCustomValidity('CEP Invalido! Favor Digitar um CEP Valido');
        } else if (this.validity.valueMissing) {
            inputCep.addClass('invalid');
            inputCep.removeClass('valid');
            this.setCustomValidity('Favor Digitar seu CEP.');
        } else {
            inputCep.removeClass('invalid');
            inputCep.addClass('valid');
            this.setCustomValidity('');
        }
    });

    inputCidade.on('invalid', function () {
        if (this.validity.patternMismatch) {
            this.setCustomValidity('Nome de Cidade Invalida, Favor Digitar Novamente');
        } else if (this.validity.valueMissing) {
            this.setCustomValidity('Favor Digitar sua Cidade.');
        } else {
            this.setCustomValidity('');
        }
    });

    inputBairro.on('invalid', function () {
        if (this.validity.patternMismatch) {
            this.setCustomValidity('Nome de Bairro Invalido, Favor Digitar Novamente');
        } else if (this.validity.valueMissing) {
            this.setCustomValidity('Favor Digitar seu Bairro.');
        } else {
            this.setCustomValidity('');
        }
    });

    inputRua.on('invalid', function () {
        if (this.validity.patternMismatch) {
            this.setCustomValidity('Nome de Rua Invalida, Favor Digitar Novamente');
        } else if (this.validity.valueMissing) {
            this.setCustomValidity('Favor Digitar sua Rua.');
        } else {
            this.setCustomValidity('');
        }
    });

    inputNumero.on('invalid', function(){
        if (this.validity.patternMismatch) {
            this.setCustomValidity('Numero Invalido, Favor Digitar Novamente');
        } else if (this.validity.valueMissing) {
            this.setCustomValidity('Favor Digitar o Numero da sua Residencia.');
        } else {
            this.setCustomValidity('');
        }
    });
})();