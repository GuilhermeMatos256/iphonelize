/*
	Geral
*/
(function () {

    'use strict';

    $(document).ready(function () {
        $('select').formSelect();
        $('.sidenav').sidenav();
        $('.datepicker').datepicker();
        //$('.collapsible').collapsible();


        if (typeof (localStorage) === undefined) {
            window.alert('Seu navegador não suporta localStorage');
        }
        if (typeof (sessionStorage) === undefined) {
            window.alert('Seu navegador não suporta sessionStorage');
        }
    });


})();