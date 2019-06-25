/*
	Geral
*/
(function () {

    'use strict';

    $(document).ready(function () {
        $("#footer").load("footer.html");
        $("#menu").load("nav.html");
        $("#mobile").load("nav-cell.html");
        $('.sidenav').sidenav();
        $('.dropdown-trigger').dropdown();
        $('select').formSelect();
        $('.datepicker').datepicker();
        $('.slider').slider();
        //$('.collapsible').collapsible();


        if (typeof (localStorage) === undefined) {
            window.alert('Seu navegador não suporta localStorage');
        }
        if (typeof (sessionStorage) === undefined) {
            window.alert('Seu navegador não suporta sessionStorage');
        }

        var backSlider = M.Slider.getInstance(document.getElementById(back));
        var forwardSlider = M.Slider.getInstance(document.getElementById(forward));
        backSlider.next();
    });


})();
