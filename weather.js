$(document).ready(function () {
    var apiKey = '27edde7fb70b98c1acd56406a77ce1bf';
    $("#encotradosTiempo").hide();


    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        $('#tiempoTuCiudad').html("La geolocalicación no está disponible en este navegador");
    }

    function getWeather(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

        $.ajax({
            url: apiURL,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const temp = data.main.temp;
                const city = data.name;
                const nubes = data.clouds.all;
                const min = data.main.temp_min;
                const max = data.main.temp_max;
                const hum = data.main.humidity;
                const desc = data.weather[0].description;
                $("#HumeHoy").text(`${hum}%`)
                $("#NubeHoy").text(`${nubes}%`)
                $("#TempHoy").text(`${temp}Cº`)
                $("#MaxHoy").text(`${max}Cº`)
                $("#MinHoy").text(`${min}Cº`)
                $("#ciudadMia").text(city);
                $("#tiempo").text(`${temp}Cº`);
                $("#EstHoy").text(desc);
            },
            error: function () {
                $("#tiempoTuCiudad").text(`No se pudo obtener la temperatura.`);
            }
        });
        
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`,
            type: 'GET',
            success: function(dataList){
                let listaPred = dataList.list;
                

                for(let i=0;i<listaPred.length;i++){
                    $('#Min' + i).text((listaPred[i].main.temp_min)+"Cº");
                    $('#Max' + i).text((listaPred[i].main.temp_max)+"Cº");
                    $('#Est' + i).text(listaPred[i].weather[0].description);
                    $('#Temp'+ i).text((listaPred[i].main.temp)+"Cº");
                    $('#Nube' + i).text((listaPred[i].clouds.all)+"%");
                    $('#Hume' + i).text((listaPred[i].main.humidity)+"%");
                }
            }
            



        })


    }
    function error() {
        $("#tiempoTuCiudad").text(`No se pudo obtener tu ubicacion.`);
    }





    $('#buscarCiudades').on('click', function (event) {
        $('#infoCiudad').text("")
        var ciudad = $('#ciudad').val();
        var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${apiKey}&lang=es`;

        $.ajax({

            url: apiUrl,
            method: 'GET',
            success: function (response) {
                $('#infoCiudad').empty();
                if (response.length > 0) {
                    $.each(response, function (index, ciudadInfo) {
                        const lat = ciudadInfo.lat;
                        const lon = ciudadInfo.lon;
                        const pais = ciudadInfo.country;
                        const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

                        $.ajax({
                            url: apiURL,
                            method: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                const temp = data.main.temp;
                                const city = data.name;
                                const desc = data.weather[0].description;
                                
                                $("#infoCiudad").append(
                                    `<option value="${lon} ${lat}">${city} (${pais})  ${temp}Cº</option>`
                                );
                            },
                            error: function () {
                                $("#tiempoCiudad").text(`No se pudo obtener la temperatura.`);
                            }




                        });


                    });
                    
                } else {
                    $('#infoCiudad').html('<p>No se encontró información para esa ciudad.</p>');
                }
            },
            error: function () {
                $('#infoCiudad').html('<p>Hubo un error al consultar la API.</p>');
            }
        });


    });
    $('#buscarTiempo').on('click', function(){
        event.preventDefault();
        $("#encotradosTiempo").show();

        var valor = $('#infoCiudad').val();

        const [lo,la] = valor.split(" ");

        long = lo;
        lati =  la;

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apiKey}&units=metric&lang=es`,
            type: 'GET',
            success: function(data){

                const temp2 = data.main.temp;
                const nubes2 = data.clouds.all;
                const min2 = data.main.temp_min;
                const max2 = data.main.temp_max;
                const hum2 = data.main.humidity;
                const desc2 = data.weather[0].description;

                $("#2HumeHoy").text(`${hum2}%`)
                $("#2NubeHoy").text(`${nubes2}%`)
                $("#2TempHoy").text(`${temp2}Cº`)
                $("#2MaxHoy").text(`${max2}Cº`)
                $("#2MinHoy").text(`${min2}Cº`)
                $("#2EstHoy").text(desc2);
            }
        })
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&appid=${apiKey}&units=metric&lang=es`,
            type: 'GET',
            success: function(dataList){
                let listaPred = dataList.list;
                
    
                for(let i=0;i<listaPred.length;i++){
                    $('#2Min' + i).text((listaPred[i].main.temp_min)+"Cº");
                    $('#2Max' + i).text((listaPred[i].main.temp_max)+"Cº");
                    $('#2Est' + i).text(listaPred[i].weather[0].description);
                    $('#2Temp'+ i).text((listaPred[i].main.temp)+"Cº");
                    $('#2Nube' + i).text((listaPred[i].clouds.all)+"%");
                    $('#2Hume' + i).text((listaPred[i].main.humidity)+"%");
                }
            }
            
    
    
    
        })
        
    })
    
    

});