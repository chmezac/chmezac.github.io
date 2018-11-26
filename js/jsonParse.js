var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(xhttp.responseText);
        var mascota = response;

        var output = '';
        for (var i = 0; i < mascota.length; i++) {
            output += '<article>' + '<h5><b>'+mascota[i].nombre+'</h5></b>' + 
            '<p><b>Raza: </b>' +mascota[i].raza+'</p>' + '<p><b>Description: </b>' +mascota[i].descripcion+'</p>' + '<p><b>Estado: </b>' +mascota[i].state+'</p>'+'</article>'; 
        }

        document.getElementById('listado').innerHTML = output;
    }
};

xhttp.open("GET", "https://huzumymw513.pythonanywhere.com/adopcion/mascota/?format=json", true);
xhttp.send();