angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, auth, $state, store) {
  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      $state.go('tab.dash');
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  doAuth();


})

.controller('DashCtrl', function($scope, auth, store, $state) {
    $scope.logout = function() {
        auth.signout();
        store.remove('token');
        store.remove('profile');
        store.remove('refreshToken');
        $state.go('login', {}, {
            reload: true
        });
    };
})

.controller('LogoutCtrl', function($scope, auth, store, $state) {
        auth.signout();
        store.remove('token');
        store.remove('profile');
        store.remove('refreshToken');
        $state.go('login', {}, {
            reload: true
        });
})

.controller('MapCtrl', function($scope, auth, store, $state) {
	
    $scope.logout = function() {
        auth.signout();
        store.remove('token');
        store.remove('profile');
        store.remove('refreshToken');
        $state.go('login', {}, {
            reload: true
        });
    };

    L.mapbox.accessToken = 'pk.eyJ1IjoibGVsZTk5MSIsImEiOiJjaW4wMzlvZTYwMGtudnpseTlkZGo4eWRiIn0.tm4vSh6gsqMO1aL8_spMhw';
    var map = L.mapbox.map('map', 'mapbox.streets')
    .addControl(L.mapbox.geocoderControl('mapbox.places', { position: 'topright' }));

    function onLocationFound(e) {
        var radius = "8046.72"; //miglia in metri

        L.marker(e.latlng).addTo(map)
            .bindPopup("Your position").openPopup();

        L.circle(e.latlng, radius).addTo(map);
		
    }
	
	function onLocationError(e) {
        alert(e.message);
    }
	

    function showPosition(e) {
        setTimeout(onLocationFound, 5000, e);
    }

    function showPositionError(e) {
        setTimeout(onLocationError, 5000, e);
    }

    map.on('locationfound', showPosition);
    map.on('locationerror', showPositionError);
	
    map.locate({setView: true, maxZoom: 16});
})


.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, auth, store, $state) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };
});
