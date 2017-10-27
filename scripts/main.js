


Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
        });

const applicationServerPublicKey = BA04K6jk8v32ht460vsyGWRuPBybvVrpOJzaQ7tQXDHcSoCbbBZmlaCGO7RDhX8KA6HMb5T2XPKG8YWWpr7tWfc-u3Muvuy8mWyEIcz4I';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
	
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}

function initializeUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('service-worker.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    initializeUI();
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

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
