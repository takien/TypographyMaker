window.fbAsyncInit = function() {
	FB.init({
	appId      : '307305929428973',
	cookie     : true,  
	xfbml      : true,
	version    : 'v2.0' 
	});


	FB.getLoginStatus(function(response) {
		console.log('statusChangeCallback');
		console.log(response);
		if (response.status === 'connected') {
			FB.api('/me', function(response) {
				alert(response.name);
			});		
		} else if (response.status === 'not_authorized') {
		  // The person is logged into Facebook, but not your app.
		  document.getElementById('status').innerHTML = 'Please log ' +
			'into this app.';
		} else {
		  // The person is not logged into Facebook, so we're not sure if
		  // they are logged into this app or not.
		  document.getElementById('status').innerHTML = 'Please log ' +
			'into Facebook.';
		}
	});
};




