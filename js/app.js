(  function() {
    var app = {
        perrisColorFilter: document.getElementById( "perrisColorFilter" ),
        PerrisList: [],
    }

    var loadData = function() {
        var xhttp = new XMLHttpRequest();
        var url = "http://127.0.0.1:8000/perris/";

        xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200 ){
                console.log( this.responseText );
                var data = JSON.parse( this.responseText );
                displayPerris( data.results );
                app.PerrisList = data.results;
            }
        }
        xhttp.open( 'GET', url, true );
        xhttp.send();
    }

        var displayPerris = function( perris ) {
        var bearsContainer = document.getElementById( "bearsContainer");
        bearsContainer.innerHTML = "";

        for( let perri of perris ) {
            var bearContainer = document.createElement( "div" );
            var txtBearName = document.createElement( "h3" );
            var imgBear = document.createElement( "img" );
            var txtBearDescription = document.createElement( "p" );
            var txtBearRaza = document.createElement( "p" );
            var txtBearColor = document.createElement( "p" );
            
            bearContainer.className = "bearContainer";
            txtBearName.innerHTML = perri.nombre;

            imgBear.src = perri.imageUrl;
            imgBear.alt = perri.nombre;
            txtBearDescription.innerHTML = "<b>Descripción: </b>" +  perri.descripcion;
            txtBearRaza.innerHTML = "<b>Raza: </b>" +  perri.raza;
            txtBearColor.innerHTML = "<b>Estado: </b>" + perri.state;
            
            // Agregar los hijos correspondientes
            bearContainer.appendChild( txtBearName );
            bearContainer.appendChild( imgBear );
            bearContainer.appendChild( txtBearDescription );
            bearContainer.appendChild( txtBearRaza );
            bearContainer.appendChild( txtBearColor );
            
            // Agregar el contenedor al documento
            bearsContainer.appendChild( bearContainer );
        }
    }



    //FILTRA
    app.perrisColorFilter.addEventListener( "change", function( e ) {
        var filteredBears = app.PerrisList.filter( function( perri ) {
            if( perri.state == app.perrisColorFilter.value ) {
                return perri;
            }
        } );
        displayPerris( filteredBears );
    } );
    
    loadData();
} ) ( );