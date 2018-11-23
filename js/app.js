( function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./service-worker.js')
                 .then(function() { 
                     console.log('Service Worker Registered'); 
                });
      }
} )( );


//iOS
//componentDidMount() {
//    window.addEventListener('online', () => this.setOnlineStatus(true));
//   window.addEventListener('offline', () => this.setOnlineStatus(false));
//  }

//  componentWillUnmount() {
//    window.removeEventListener('online');
//    window.removeEventListener('offline');
//  }

//setOnlineStatus = isOnline => this.setState({ online: isOnline })

