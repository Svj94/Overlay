


Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
        });

requirejs(["utility/pace"], function(pace) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "utility/pace".

		
	
	function displayNotification() {
	  if (Notification.permission == 'granted') {
	    navigator.serviceWorker.getRegistration().then(function(reg) {
	     	var options = {
		body: 'Here is a notification body!',
		icon: 'images/144_Copy.png',
		vibrate: [100, 50, 100],
		data: {
		  dateOfArrival: Date.now(),
		  primaryKey: 1
		}
	      };
	      reg.showNotification('Hello world!', options);
	      });
	    }
	  }
		
		if ('serviceWorker' in navigator) {
		  navigator.serviceWorker.register('server-worker.js').then(function(reg) {
		    console.log('Service Worker Registered!', reg);

		    reg.pushManager.getSubscription().then(function(sub) {
		      if (sub === null) {
			// Update UI to ask user to register for Push
			console.log('Not subscribed to push service!');
		      } else {
			// We have a subscription, update the database
			console.log('Subscription object: ', sub);
		      }
		    });
		  })
		   .catch(function(err) {
		    console.log('Service Worker registration failed: ', err);
		  });
		}
	     
	
		  function subscribeUser() {
		  if ('serviceWorker' in navigator) {
		    navigator.serviceWorker.ready.then(function(reg) {

		      reg.pushManager.subscribe({
			userVisibleOnly: true
		      }).then(function(sub) {
			console.log('Endpoint URL: ', sub.endpoint);
		      }).catch(function(e) {
			if (Notification.permission === 'denied') {
			  console.warn('Permission for notifications was denied');
			} else {
			  console.error('Unable to subscribe to push', e);
			}
		      });
		    })
		  }
		}

	
	
		$(document).ready(function(){
			$.ajax({
					url: "/Overlay/json/handshake.json", //"http://10.20.0.65:8081/overlay.svc/Handshake",
					type: 'GET',
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					async: false,
					success: function (data) {
						console.log(data.ClientSessionToken);
					    var token = encodeURIComponent(data.ClientSessionToken);
					    window.location = "login.html?token=" + token;
					},
					error: function (data) {
						console.log("Overlay Server not available!");
						
					}
				});				
		});	
		
});
