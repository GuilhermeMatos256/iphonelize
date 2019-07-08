(function () {
    'use strict';
    window.onload = function () {

        let getId = function () {
            let str = window.location + '';
            let i = str.indexOf('=');
            return str.substring(i + 1, str.length);
        };

        let getProduto = function () {
            let produtos;
            let id = getId();
            if (localStorage.getItem('produtos')) {
                produtos = JSON.parse(localStorage.getItem('produtos'));
            } else {
                produtos = [];
            }

            for (let pdt of produtos) {
                if (pdt.idProduto == id) { // se colocar 3 iguais para de funcionar
                    return pdt;
                }
            }
        };

        let produto = getProduto();
        let valor = produto.preco * $('#quantidade').val();

        document.getElementById('nome-produto').innerHTML = produto.nome;
        document.getElementById('preco-produto').innerHTML = 'R$: ' + Number(valor).toFixed(2);
        document.getElementById('preco-total').innerHTML = 'R$: ' + Number(valor + 20).toFixed(2);

        $('#quantidade').on('change paste keyup', function(){
            valor = produto.preco * $('#quantidade').val();
            document.getElementById('preco-produto').innerHTML = 'R$: ' + Number(valor).toFixed(2); 
            document.getElementById('preco-total').innerHTML = 'R$: ' + Number(valor+20).toFixed(2);

        });

        let imgs = [];
        imgs.push(produto.imgs.urlImg1);
        imgs.push(produto.imgs.urlImg2);
        imgs.push(produto.imgs.urlImg3);

        $('ul').children('li').children('img').attr('style',
            'background-image: url("' + imgs[0].urlImagem + '");');
        $('ul').children('li').next().children('img').attr('style',
            'background-image: url("' + imgs[1].urlImagem + '");');
        $('ul').children('li').next().next().children('img').attr('style',
            'background-image: url("' + imgs[2].urlImagem + '");');
    };
})();