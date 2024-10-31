$(document).ready(function(){

    $('#buscar').on('click', function(event){
        var ciudad = $('#ciudad').val();
        var apiKey = '44ee61d1bf2987fb02d4094845e0bbb6';
        var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${apiKey}`





    });



});