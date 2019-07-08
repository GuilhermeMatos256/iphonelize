'use strict';
(function () {

    window.onload = function () {
        let categorias;
        let produtos;

        if (localStorage.getItem('categorias')) {
            categorias = JSON.parse(localStorage.getItem('categorias'));
        } else {
            categorias = [];
        }

        if (localStorage.getItem('produtos')) {
            produtos = JSON.parse(localStorage.getItem('produtos'));
        } else {
            produtos = [];
        }

        let update = (function () {

            for(let ctg of categorias){
                $('.container').append(`
                <section class="row" id="categoria-${ctg.idCategoria}">
                    <h3>${ctg.nome}</h3>
                </section>
                `);
            }

            function getSection (idCategoria){
                return $('#categoria-'+idCategoria);
            }

            let limit;
            if(categorias.length < 4)
                limit = categorias.length;
            else
                limit = 4;

            for (let i = 0; i < limit; i++) {
                getSection(produtos[i].idCategoria).append(`
                <article class="card col s6 l3">
                <div>
                    <div class="card-image">
                        <img src=${produtos[i].imgs[0]}" onerror="errorImg(this);">
                        <span class="card-title black-text">${produtos[i].nome}</span>
                    </div>
                    <div class="card-content center-align">
                        <div>
                            <span id="preco-card">R$ ${produtos[i].preco}</span>
                        </div>
                        <a href="item.html" class="waves-effect waves-light btn black col s12 l12">
                        Detalhes
                        </a>
                    </div>
                </div>
                </article>
                `);
            }
        })();
    };
})();


function errorImg(img){
    img.onerror = '';
    img.src = 'assets/resources/images/default.jpg';
    return true;
}