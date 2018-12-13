(  function() {
    var app = {
        tiendaTipoFilter: document.getElementById( "tiendaTipoFilter" ),
        ProductosList: [],
    }

    var loadData = function() {
        var xhttp = new XMLHttpRequest();
        var url = "https://testperris3.pythonanywhere.com/Producto/";
        

        xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200 ){
                console.log( this.responseText );
                var data = JSON.parse( this.responseText );
                displayProductos( data.results );
                app.ProductosList = data.results;
            }
        }
        xhttp.open( 'GET', url, true );
        xhttp.send();
    }

        var displayProductos = function( productos ) {
        var ProductosContainer = document.getElementById( "ProductosContainer");
        ProductosContainer.innerHTML = "";

        for( let producto of productos ) {
            var ProductoContainer = document.createElement( "div" );

            var txtProdName = document.createElement( "h3" );
            var txtProdDescription = document.createElement( "p" );
            var txtProdPrecio = document.createElement( "p" );
            var txtProdTipo = document.createElement( "p" );
            var imgProd = document.createElement( "img" );
            
            ProductoContainer.className = "ProductoContainer";
            txtProdName.innerHTML = producto.nombre_producto;

            imgProd.src = producto.imageUrl;
            imgProd.alt = producto.nombre_producto;

            txtProdDescription.innerHTML = "<b>Descripción: </b>" +  producto.descripcion;
            txtProdTipo.innerHTML = "<b>Tipo: </b>" +  producto.tipo;
            txtProdPrecio.innerHTML = "<b>Precio: </b>" + producto.precio;
            

            // Agregar los hijos correspondientes
            ProductoContainer.appendChild( txtProdName );
            ProductoContainer.appendChild( imgProd );
            ProductoContainer.appendChild( txtProdDescription );
            ProductoContainer.appendChild( txtProdTipo );
            ProductoContainer.appendChild( txtProdPrecio );
            
            // Agregar el contenedor al documento
            ProductosContainer.appendChild( ProductoContainer );
        }
    }



    //FILTRA
    app.tiendaTipoFilter.addEventListener( "change", function( e ) {
        var filteredProd = app.ProductosList.filter( function( producto ) {
            if( producto.tipo == app.tiendaTipoFilter.value ) {
                return producto;
            }
        } );
        displayProductos( filteredProd );
    } );
    
    loadData();
} ) ( );