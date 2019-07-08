(function () {
    'use strict';

    let $$ = function (id) {
        return document.getElementById(id);
    };

    window.onload = function () {

        let login = window.prompt('Digite o login');
        let senha = window.prompt('Digite a senha');

        if (login !== 'admin' && senha !== '12345') {
            document.location.href = '';
        }

        class Categoria {
            constructor(idCategoria, nome, descricao) {
                this.idCategoria = idCategoria;
                this.nome = nome;
                this.descricao = descricao;
            }
        }

        class Produto {
            constructor(idProduto, idCategoria, nome, descricao, preco, qtd, imgs) {
                this.idProduto = idProduto;
                this.idCategoria = idCategoria;
                this.nome = nome;
                this.descricao = descricao;
                this.preco = preco;
                this.qtd = qtd;
                this.imgs = imgs;
            }

            addImg(img) {
                this.imgs.push(img);
            }
        }

        class Imagem {
            constructor(idProduto, urlImagem) {
                this.idProduto = idProduto;
                this.urlImagem = urlImagem;
            }
        }

        let categorias;
        let produtos;

        function updateCategoriaSelect() {
            let option = document.createElement('option');
            console.log(categorias);
            for (let ctg of categorias) {
                option.innerText = ctg.nome;
                option.value = ctg.idCategoria;
                $('#select-categoria').append(option);
            }
            $('#select-categoria').formSelect();
        }

        if (localStorage.getItem('categorias')) {
            categorias = JSON.parse(localStorage.getItem('categorias'));
            updateCategoriaSelect();
        } else {
            categorias = [];
        }

        function updateCategoria(novaCategoria) {
            categorias.push(novaCategoria);
            localStorage.qtdCategorias = categorias.length;
            localStorage.categorias = JSON.stringify(categorias);
        }

        if (localStorage.getItem('produtos')) {
            produtos = JSON.parse(localStorage.getItem('produtos'));
        } else {
            produtos = [];
        }

        function updateProduto(novoProduto) {
            produtos.push(novoProduto);
            localStorage.qtdProdutos = produtos.length;
            localStorage.produtos = JSON.stringify(produtos);
        }

        let addCategoriaSelect = function (categoria) {
            let select = document.getElementsByTagName('select');
            let option = document.createElement('option');
            option.innerText = categoria.nome;
            option.value = categoria.idCategoria;
            console.log(select);
            console.log(option);
            select[0].appendChild(option);
            $(select[0]).formSelect();
        };

        console.log(document.forms[0].elements);

        function validaInput(input) {
            if (!input.value) {
                input.setAttribute('class', 'validate invalid');
                return false;
            } else {
                input.setAttribute('class', 'validate valid');
                return true;
            }
        }

        document.forms[1].onsubmit = function (event) {
            event.preventDefault();
            console.log('foi');
            let inputNomeCategoria = document.forms[1].elements[0];
            let inputDescricaoCategoria = document.forms[1].elements[1];

            if (validaInput(inputNomeCategoria) === false ||
                validaInput(inputDescricaoCategoria) === false) {
                window.alert('Favor Digitar os Campos em Branco!');
                return false;
            }

            let novaCategoria = new Categoria(categorias.length,
                inputNomeCategoria.value, inputDescricaoCategoria.value);
            addCategoriaSelect(novaCategoria);
            updateCategoria(novaCategoria);

            window.alert('Categoria Cadastrada com Sucesso!');
            inputNomeCategoria.value = '';
            inputDescricaoCategoria.value = '';
        };

        document.forms[2].onsubmit = function (event) {
            event.preventDefault();
            console.log('nao pohaaaaaa');
            let inputNomeProduto = $$('input-nome-produto');
            let selectCategoria = $('#select-categoria');
            let inputPreco = $$('input-preco');
            let inputQtd = $$('input-quantidade');
            let inputDescricaoProduto = $$('input-descricao-produto');
            let urlImg1 = new Imagem(produtos.length, $('#url-img-1').val());
            let urlImg2 = new Imagem(produtos.length, $('#url-img-2').val());
            let urlImg3 = new Imagem(produtos.length, $('#url-img-3').val());

            console.log(selectCategoria.val());

            if (validaInput(inputNomeProduto) === false || !selectCategoria.val() ||
                validaInput(inputPreco) === false || validaInput(inputQtd) === false ||
                validaInput(inputDescricaoProduto) === false) {
                window.alert('Favor Preencher os Campos em Branco!');
                return false;
            }

            let novoProduto = new Produto(produtos.length, selectCategoria.val(),
                inputNomeProduto.value, inputDescricaoProduto.value, inputPreco.value, 
                inputQtd.value, {
                    urlImg1,
                    urlImg2,
                    urlImg3
                });

            updateProduto(novoProduto);
            console.log(novoProduto);

            window.alert('Produto Cadastrado com Sucesso!');
            inputNomeProduto.value = '';
            inputPreco.value = '';
            inputQtd.value = '';
            inputDescricaoProduto.value = '';
            $('#url-img-1').val('');
            $('#url-img-2').val('');
            $('#url-img-3').val('');

        };

    };
})();