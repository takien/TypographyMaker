jQuery(document).ready(function($){
	$('#remix-this').click(function(e) {
		if (typeof(Storage) != "undefined") {
				localStorage.setItem("autosavecanvas",$('#template').val());
				window.location.href="http://typographymaker.com";
		}
		else {
			alert('Your browser doesn\'t support Local storage, please update your browser');
		}

		e.preventDefault();
	});
});