(function () {
    'use strict';
    let categorias;
    if (localStorage.getItem('categorias')) {
        categorias = JSON.parse(localStorage.getItem('categorias'));
    } else {
        categorias = [];
    }
    for (let ctg of categorias) {

        $('#dropdown').append(`
            <li><a href="#">${ctg.nome}</a></li>
            <li class="divider"></li>
            `);
    }
    $('#nav-pesquisa').hide();

    $('#botao-pesquisa').on('click',function(){
        $('#nav-pesquisa').slideToggle(500);
    });

})();