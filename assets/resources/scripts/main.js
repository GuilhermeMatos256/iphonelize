/*
	Geral
*/
(function () {

    'use strict';

    $(document).ready(function () {
        $('.sidenav').sidenav();
        $('.datepicker').datepicker();
        //$('.collapsible').collapsible();
        $('select').formSelect();

        if(typeof (localStorage) === undefined){
            window.alert('Seu navegador não suporta localStorage');
        }

        if(typeof (sessionStorage) === undefined){
            window.alert('Seu navegador não suporta sessionStorage');
        }
    });


})();