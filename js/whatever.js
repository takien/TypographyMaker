var site_url = 'http://typographymaker.com/';
var loading = document.getElementById('loading');
loading.getElementsByTagName("span").innerHTML = 'Loading jQuery...';
var morefont = ['Lobster','Special Elite','Chewy','Playball','Bangers','Oleo Script','Coda','Alfa Slab One','Cinzel Decorative','Oleo Script Swash Caps','UnifrakturMaguntia','Creepster','Nosifer'];

/* (function () {
    if (!console) {
        console = {};
    }
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
})(); */


fallback.load({
	jqueryui_css: site_url+'css/jquery-ui-1.10.4.custom.css',
	fa_css: '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css',
	font_css: site_url+"css/font-LeagueGothicRegular.css",
	'jQuery': [
		'//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
		site_url+'js/jquery.min.js'
	],
	'jQuery.ui': [
		site_url+'js/jquery-ui-resizable.js'
	],
	'bootstrap': [
		site_url+'js/bootstrap.min.js'
	],
	'jscolor': [
		site_url+"js/jscolor.js"
	],
	'social': [
		site_url+"js/social.js"
	],
	'googlefonts': [
		site_url+"js/googlefonts.js"
	],
	'plupload': [
		 site_url+"js/plupload.full.min.js"
	],
	'fabric': [
		//'//cdnjs.cloudflare.com/ajax/libs/fabric.js/1.4.0/fabric.min.js',
		site_url+'js/fabric.1.4.7.min.js'
	]
}, {
	shim: {
		'jQuery.ui': ['jQuery'],
		'bootstrap': ['jQuery'],
		'fa_css': ['fabric'],
		'plupload': ['fabric'],
		'googlefonts': ['fabric'],
		'social': ['fabric'],
		'jscolor': ['fabric']
	},
	callback: function(success, failed) {
	}
});




fallback.ready(['jQuery'], function() {

window.fbAsyncInit = function() {
	FB.init({
	appId      : '307305929428973',
	cookie     : true,  
	xfbml      : true,
	version    : 'v2.0' 
	});


	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			/* if (typeof(Storage) != "undefined") {
				localStorage.setItem("reloaded",null);
			} */
				
			$('.fb-login-btn').hide();
			FB.api('/me', function(r) {
				$('.fb-name').html(r.name); 
				r.accessToken   = response.authResponse.accessToken;
				r.signedRequest = response.authResponse.signedRequest;
				$.post(site_url+'check.php',r,function(res){
					//console.log(res);
					if(res == '1') {
						//javascript:location.reload(false);
						alert('Please provide email address permission');
					}
					if((res == '3') || (res == '2')) {
						javascript:location.reload(false);
					}
					/* if (typeof(Storage) != "undefined") {
						if(localStorage.getItem("reloaded") !== 1) {
							javascript:location.reload(false);
							localStorage.setItem("reloaded",1);
						}
					} */
					
				});
			});
			FB.api(
				"/me/picture",
				function (response) {
				  if (response && !response.error) {
					$('.fb-avatar').html('<img src="'+response.data.url+'" />');
				  }
				}
			);
			
			$('.fb-loggedin-btn').show();
		} else if (response.status === 'not_authorized') {
		  // The person is logged into Facebook, but not your app.
		  //document.getElementById('status').innerHTML = 'Please log ' +	'into this app.';
		} else {
		  // The person is not logged into Facebook, so we're not sure if
		  // they are logged into this app or not.
		  //document.getElementById('status').innerHTML = 'Please log ' +	'into Facebook.';
		}
	});
	
	
};


(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$.ajaxSetup({
	cache: true
});

$('#new-blank').click(function(e) { 
	if (typeof(Storage) != "undefined") {
		if(localStorage.getItem("autosavecanvas")) {
			localStorage.setItem("autosavecanvas",null);
		}
	}
	var ms = new Date().getUTCMilliseconds();
	window.top.location = site_url+'?'+ms;
	e.preventDefault();
});

$('#main').css('min-height',$(window).height() - 100);

function easytablejs() {
	$('.easytablejs').each(function() {
		var table_t = $(this).html();
		var table_r = table_t.trim().split("\n");
		var html  = '<table class="table table-clean">';
		for(var r = 0; r < table_r.length; r++) {
			var thtd = ( r == 0 ) ? 'th' : 'td';
			html += '<tr><'+thtd+'>';
				var table_c = table_r[r].trim();
				html += table_c.replace(/:/g,'</'+thtd+'><'+thtd+'>');
				
			html += '</'+thtd+'></tr>';
		}
		html += '</table>';
		$(this).html(html);
	});
}
easytablejs();


function loading(text) {
	if(typeof $ == 'undefined') {
		var loading = document.getElementById('loading');
		loading.getElementsByTagName("span").innerHTML = text;
	}
	else {
		$('#loading span').append(text+'<br>');
	}
}


/** bootstrap ready*/
    /* prevent autoclose dropdown on input click*/
	$('.dropdown-menu input, .dropdown-menu label').click(function(e) {
		e.stopPropagation();
	});
	
	$('.modal').on('shown.bs.modal', function (e) {
		var md = $(this).find('.modal-dialog');
		md.css({
			marginTop:0,
			top: (($(window).height()-md.height())/2)-20
		});
		
	});
	
	$('select.fake-select').each(function(){
		var _select = $(this);
		_select.before('<span class="fake-select-mask" id="'+_select.attr('id')+'-mask"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"> <span class="fake-selected">'+_select.val()+'</span> <span class="caret"></span></button><ul class="dropdown-menu"></ul></span>');
		var select_mask  = _select.prev('.fake-select-mask');
		var data_control = $(this).data('control');
		_select.find('option').each(function() {
			var text = $(this).text();
			if(data_control == 'stroke-width') {
				if($(this).val() > 0) {
					text = '<span style="margin:5px 0;display:block;background:#000;height:'+$(this).val()+'px"></span>';
				}
				else {
					text = $(this).val();
				}
			}
			
			select_mask.find('.dropdown-menu').append('<li><a '+((data_control=='font-family') ? 'style="font-family:'+$(this).val()+';" ' : '')+'data-val="'+$(this).val()+'" href="#">'+text+'</a></li>');
		});
		
		
		select_mask.attr('title',(_select.attr('title') || ''));
		select_mask.find('.dropdown-menu li a').each(function() {
			$(this).click(function(){
				_select.val($(this).data('val')).change();
				select_mask.find('.fake-selected').text($(this).data('val'));
			});
		});
		_select.hide();
	});
	
	$(document).on('change','select.fake-select',function() {
		$(this).prev('.fake-select-mask').find('.fake-selected').text($(this).val());
	});

	
	$(document).on('click','#font-family-mask li a',function(e) {
		$('#font-family').val($(this).data('val')).change();
		$(this).find('.fake-selected').text($(this).data('val'));
	});

	


fallback.ready(['fabric'], function() {
//fabric ready
	$('#loading').fadeOut('slow',function(){
		$('#loading').remove();
	}); 
	
	var canvas = new fabric.Canvas('c');

	
	/*$( ".drags" ).draggable({ handle:'.panel-heading',
		containment: "#main", 
		scroll: false,
		start: function(e) { 
			$('.drags').css('z-index', 1);
			$(this).css('z-index', 2);
		}
		//stop:  function(e) { $(this).css('z-index', -1)}
	});*/
	
	canvas.backgroundColor="#FFF";
	canvas.selectionColor = 'rgba(255,255,255,0.3)';
	canvas.selectionBorderColor = 'blue';
	canvas.selectionLineWidth = 1;
	canvas.selectionDashArray = [3, 2];
	
	var Default = {
		fill       : $('#color-fill').val() || '#FFFFFF',
		stroke     : $('#stroke-color').val() || null,
		//hasBorders : false,
		//cornerColor: 'black',
		//transparentCorners: false,
		//cornerSize: 6
		//strokeWidth: $('[name="stroke-width"]').val() || 1,
	};
	
	var i=0;
	function update_Control() { i++;
	
	/* toggle */
	$('.control-toggle').each(function() {
		var control = $(this).data('control');
		$(this).removeClass('active');
		switch( control ) {
			case 'bold':
				$(this).click(function(e) {
					setActiveStyle('fontWeight',getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
					$(this).toggleClass('active');
					e.preventDefault();
				});

			break;
			
			case 'italic':
				$(this).click(function() {
					setActiveStyle('fontStyle',getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
					$(this).toggleClass('active');
				});

			break;
			
			case 'underline':
				$(this).click(function() {
					var value = (getActiveStyle('textDecoration').indexOf('underline') > -1) ? getActiveStyle('textDecoration').replace('underline', '')  : (getActiveStyle('textDecoration') + ' underline');
					setActiveStyle('textDecoration', value);
					$(this).toggleClass('active');
				});
			break;
		}

	});

	/*control*/
	$('.control').each(function() {
		var control = $(this).data('control');
		
		switch(control) {
			case 'align-object':
				$(this).click(function(e) {
					var align = $(this).data('value');
					var activeGroup = canvas.getActiveGroup();
					if (activeGroup) {
						var objectsInGroup = activeGroup.getObjects();
					        objectsInGroup.forEach(function(object) {
						switch(align) {
						
						case 'left':
							object.set({
								left: -(activeGroup.getWidth()/2)
							});
						break;
						case 'right':
							object.set({
								left: (activeGroup.getWidth()/2)-(object.getWidth())
							});
						break;
						
						case 'top':
							object.set({
								top: (activeGroup.getHeight()/2)-(object.getHeight())
							});
						break;
						case 'bottom':
							object.set({
								top: -(activeGroup.getHeight()/2)
								
							});
						break;
						case 'centerv':
							object.set({
								top: -(object.getHeight()/2)
							});
						break;
						case 'centerh':
							object.set({
								left: -(object.getWidth()/2)
							});
						break;
						}
						
						object.setCoords();
						canvas.renderAll();
					  });
					  } 
				});
				
			break;
			case 'equal-object':
				$(this).click(function(e) {
					var equal = $(this).data('value');
					var activeGroup = canvas.getActiveGroup();
					if (activeGroup) {
						group_object_equalize(activeGroup, equal);
					}
				}); 
			break;
			case 'split-text':
				$(this).click(function(e) {
					var splitby = $(this).data('value');
					var object = canvas.getActiveObject();
					if(!object) return false;
					
					switch(splitby) {
						case 'line':
							if ((object.get('type') == 'i-text') && (object.getText().indexOf( "\n" ) > 0)) {
									var text_part = object.getText().split("\n");
									var tmp_group = new fabric.Group;
									var tmp_clone = [];
									for(i=0;i<=text_part.length-1;i++) {
										tmp_clone[i] = fabric.util.object.clone(object);
										tmp_clone[i].setText(text_part[i]);
										canvas.add(tmp_clone[i]); 
										tmp_group.addWithUpdate(tmp_clone[i]);
										canvas.renderAll();
									}
									$('a#layer-'+object.get('name')).remove();
									object.remove();

									group_object_equalize(tmp_group, 'none');
									canvas.setActiveGroup(tmp_group);
									canvas.renderAll();
							}
						break;
						case 'word':
							alert('not implemented');
						break;
						case 'char':
							alert('not implemented');
						break;
					}
				});
			break;
		}

	});

	/* prop*/
	$('.control-prop').each(function() {
		var control = $(this).data('control');
		
		switch(control) {
			case 'textBgColor':
				//$(this).val(getActiveProp('textBackgroundColor'));
				$(this).change(function() {
					setActiveProp('textBackgroundColor', $(this).val());
				});
			break;
			case 'backgroundColor':
				//$(this).val(getActiveProp('backgroundColor'));
				$(this).change(function() {
					setActiveProp('backgroundColor', $(this).val());
				});
			break;
			
			case 'fill':	
				$(this).change(function() {
					setActiveStyle('fill', $(this).val());
					if(!canvas.getActiveObject() && !canvas.getActiveGroup()) {
						canvas.backgroundColor = $(this).val();
						canvas.renderAll();
					}
				});
			break;
			
	
			case 'opacity':
				$(this).change(function() {
					setActiveStyle('opacity', parseInt($(this).val(), 10) / 100);
				})
			break;
			case 'text-align':
				var align = $(this).data('value');
				$(this).click(function() {
					$('[data-control="text-align"]').not(this).removeClass('active');
					$(this).addClass('active');
					setActiveProp('textAlign', align);
				});
				
			break;
			
			case 'font-family':
				$(this).change(function() {
					setActiveProp('fontFamily', $(this).val());
				});
			break;
			
			case 'font-size':
				$(this).change(function() {
					setActiveStyle('fontSize', parseInt($(this).val(), 10));
				});
			break;
			
			case 'line-height':
				$(this).val( getActiveStyle('lineHeight') || 1);
				$(this).change(function() {
					setActiveStyle('lineHeight', parseInt($(this).val(), 10));
				});
			break;
			
			case 'stroke-width':
				
				$(this).change(function() {
					
					if('No stroke' == $(this).val()) {
						setActiveStyle('stroke', getActiveStyle('fill'));
					}
					else {
						setActiveStyle('strokeWidth', parseInt($(this).val(), 10));
					}
				});
				
			break;
			case 'stroke-color':
				//$(this).val( getActiveStyle('stroke') || '#000000');
				$(this).change(function() {
					setActiveStyle('stroke', $(this).val());
				});
			break;

			
		}
		
	});
	}
	//canvas.on('object:selected', update_Control).on('selection:cleared',update_Control);
	update_Control();

	canvas.on('object:selected', function(o){
	
		$('#toolbar .btn,#toolbar input,#toolbar select').prop('disabled',false);
		$('#layer a').removeClass('active');
		
		if(o.target.get('type') == 'group') {
		  o.target.set({'originX':'center','originY':'center'});
		  var objectsInGroup = o.target.getObjects();
		  objectsInGroup.forEach(function(object) {
			$('#layer-'+object.name).addClass('active');
		  });
		}
		else {
			$('#color-fill').val(o.target.fill).css('backgroundColor',o.target.fill);
			$('#stroke-color').val(o.target.stroke).css('backgroundColor',o.target.stroke);
			$('#stroke-width').val(o.target.strokeWidth).change();
			$('#opacity').val(o.target.opacity * 100).change();
			if(o.target.type == 'i-text') {
				$('#line-height').val(o.target.lineHeight).change();
				$('#text-align .btn,#font-style .btn').removeClass('active');
				$('#text-align [data-value="'+o.target.textAlign+'"]').addClass('active');
				$('#font-family').val(o.target.fontFamily).change();
				$('#font-size').val(o.target.fontSize).change();
				
				if(getActiveStyle('fontWeight') === 'bold') {
					$('[data-control="bold"]').addClass('active');
				}
				if(getActiveStyle('fontStyle') === 'italic') {
					$('[data-control="italic"]').addClass('active');
				}
				if(o.target.textDecoration.indexOf('underline') > -1) {
					$('[data-control="underline"]').addClass('active');
				}
			}
			
			$('#layer-'+o.target.name).addClass('active');
		}
		//console.log(o.target);
		//$('#properties').text(JSON.stringify(o.target));
	
		
	}).on('selection:cleared',function(){
		$('#toolbar .btn:not(.nodis),#toolbar input:not(.nodis),#toolbar select').prop('disabled',true);
		$('#layer a').removeClass('active');
	}).on('object:added',function(o){
		canvas.defaultCursor = 'default';
		var objtype = o.target.get('type');
		o.target.set('name',objtype+'_'+(countObjectType(objtype)+1));
		$('#layer').prepend('<a class="list-group-item obj-layer" id="layer-'+o.target.name+'" data-name="'+o.target.name+'" href="#">'+o.target.name.replace('i-','')+'</a>')
	}).on('object:removed',function(o){
		
	});
	/** shortcut*/

	$(document).keydown(function(e) {
		if((e.target.tagName !== 'INPUT') && (e.target.tagName !== 'TEXTAREA') && (e.target.tagName !== 'SELECT')) {
			if((e.which >= 48) && (e.which <= 57)) {
				setActiveProp('opacity', (e.which == 48) ? 1 : (e.which-48)/10);e.preventDefault();
			}

			if((e.which == 68) && e.shiftKey) { //Shift +D
				if(canvas.getActiveObject()) {
					if((canvas.getActiveObject().get('type')== 'i-text') && canvas.getActiveObject().isEditing ) {
						return false;
					}
				var clone = fabric.util.object.clone(canvas.getActiveObject());
					clone.set({left: getActiveProp('left')+10,top: getActiveProp('top')+10});
					canvas.add(clone); 
					canvas.setActiveObject(clone); 
					e.preventDefault();
					
					if(clone.get('type') == 'i-text') {
						var json = JSON.stringify( canvas.toJSON() );
						canvas.clear();
						$('#layer').html('');
						canvas.loadFromJSON(json, function() {
							canvas.renderAll();
						});
					}
				}
			}
			if(e.which == 46) { // DEL
				removeSelected();e.preventDefault();
			}
			if(e.which == 33) { // pageup
				canvas.bringForward(canvas.getActiveObject(),true);e.preventDefault();
			}
			if(e.which == 34) { // pagedown
				canvas.sendBackwards(canvas.getActiveObject(), true);e.preventDefault();
			}
			if((e.which == 33) && e.shiftKey) { // shift+pageup
				canvas.bringToFront(canvas.getActiveObject());e.preventDefault();
			}
			if((e.which == 34) && e.shiftKey) { // shift+pagedown
				canvas.sendToBack(canvas.getActiveObject());e.preventDefault();
			}
			if(e.which == 37) { // up
				setActiveProp('left', getActiveProp('left')-1);e.preventDefault();
			}
			if(e.which == 38) { // up
				setActiveProp('top', getActiveProp('top')-1);e.preventDefault();
			}
			if(e.which == 39) { // right
				setActiveProp('left', getActiveProp('left')+1);e.preventDefault();
			}
			if(e.which == 40) { // down
				setActiveProp('top', getActiveProp('top')+1);e.preventDefault();
			}
			
		}
	});
	
	/** count object by type*/
	
	function countObjectType(type) {
	  var objectList = [],
	      objects = canvas.getObjects();
	
	  for (var i = 0, len = canvas.size(); i < len; i++) {
	    if (objects[i].type && objects[i].type === type) {
	      objectList.push(objects[i]);
	    }
	  }
	
	  return objectList.length-1;
	};
	
	/**
	 *  EQUALIZE Object width/height in group
	 */
	
	function group_object_equalize(group, equal) {	
		var objectsInGroup = group.getObjects();
		var o = -1;
		objectsInGroup.forEach(function(object) { o++;
			switch(equal) {
				case 'none':
					if(typeof objectsInGroup[(o-1)] !== 'undefined') {
						object.setTop(objectsInGroup[(o-1)].getTop()+objectsInGroup[(o-1)].getHeight());
					}
				break;
				case 'width':
					object.scaleToWidth(group.getWidth());
					object.set({
						left: -(object.getWidth()/2)
					});
					
					if(typeof objectsInGroup[(o-1)] !== 'undefined') {
						object.setTop(objectsInGroup[(o-1)].getTop()+objectsInGroup[(o-1)].getHeight());
					}

				break;
				case 'height':
					object.scaleToHeight(group.getHeight());
					object.set({
						top: -(object.getHeight()/2)
					});
				break;
				
			}
			object.setCoords();
			canvas.renderAll();
		});
	}
	
	/** add object */
	var objnum = 0;
	$('.control-add').click(function(e) { objnum++;
		var control = $(this).data('control');
		
		switch (control) {
			case 'text':
					var i=0;
					canvas.defaultCursor = 'text';
					canvas.on('mouse:down', function(o){ i++;
					if(i < 2 ) {
						var pointer = canvas.getPointer(o.e);
						origX = pointer.x;
						origY = pointer.y;
						
						var text = new fabric.IText('Your Text Here', { 
							left: origX, 
							top : origY,
							fontFamily: $('#font-family').val() || 'Bebas Neue',
							fill: '#000000',
							//hasBorders : false,
							//cornerColor: 'black',
							//transparentCorners: false,
							//cornerSize: 6
						});
						canvas.add(text);
						canvas.setActiveObject(text); 
					}
					});
				
			break;
			
			case 'rectangle':
				var i=0;
				canvas.defaultCursor = 'crosshair';
				canvas.on('mouse:down', function(o){ i++;
				if(i < 2 ) {
				var pointer = canvas.getPointer(o.e);
						origX = pointer.x;
						origY = pointer.y;
				var rectangle = new fabric.Rect($.extend({}, Default, {
					left: origX,
					top: origY,
					width: 150,
					height: 150
					}));
	
				
				canvas.add(rectangle);
				canvas.setActiveObject(rectangle); 

				}
				});
			break;

			case 'circle':
				var i=0;
				canvas.defaultCursor = 'crosshair';
				canvas.on('mouse:down', function(o){ i++;
				if(i < 2 ) {
				var pointer = canvas.getPointer(o.e);
						origX = pointer.x;
						origY = pointer.y;
				var circle = new fabric.Circle($.extend({}, Default, {
					left: origX,
					top: origY,
					radius:80
				}));
				canvas.add(circle);
				canvas.setActiveObject(circle); 
				}
				});
			break;
			
			case 'triangle':
				var i=0;
				canvas.defaultCursor = 'crosshair';
				canvas.on('mouse:down', function(o){ i++;
				if(i < 2 ) {
				var pointer = canvas.getPointer(o.e);
						origX = pointer.x;
						origY = pointer.y;
				var triangle = new fabric.Triangle($.extend({}, Default, {
					left: origX,
					top: origY
				}));
				canvas.add(triangle);
				canvas.setActiveObject(triangle); 
				}
				});
			break;

			 case 'line':
				var i=0;
				canvas.defaultCursor = 'crosshair';
				canvas.on('mouse:down', function(o){ i++;
					if(i < 2 ) {
					var pointer = canvas.getPointer(o.e);
							origX = pointer.x;
							origY = pointer.y;
					var line = new fabric.Line([50, 100, 200, 200], $.extend({}, Default, {
						left: origX,
						top: origY
					}));
					canvas.add(line);
					canvas.setActiveObject(line); 
					}
				
				}); 
			break; 
		}
		e.preventDefault();
	});
	
	/**
	 *  get active style
	 */
	function getActiveStyle(styleName, object) {
	  object = object || canvas.getActiveObject();
	  if (!object) return '';

	  return (object.getSelectionStyles && object.isEditing)
		? (object.getSelectionStyles()[styleName] || '')
		: (object[styleName] || '');
	};
	/**
	 *  set active style
	 */
	function setActiveStyle(styleName, value, object) {
	  object = object || canvas.getActiveObject();
	  if(!object) {
	  	var	activeGroup = canvas.getActiveGroup();

		if (activeGroup) {
		  var objectsInGroup = activeGroup.getObjects();
		  objectsInGroup.forEach(function(object) {
			object[styleName] = value;
			object.setCoords();
		  });
		}
		else {
			return false;
		}
	  }
	  else {
		if (object.setSelectionStyles && object.isEditing) {
			var style = { };
			style[styleName] = value;
			object.setSelectionStyles(style);
			object.setCoords();
		  }
		  else {
			object[styleName] = value;
		  }
		   object.setCoords();
		}
	  canvas.renderAll();
	};

	/**
	 *  get active prop
	 */
	function getActiveProp(name) {
	  var object = canvas.getActiveObject();
	  if (!object) return '';

	  return object[name] || '';
	}

	/**
	 *  set active prop
	 */
	function setActiveProp(name, value) {
	  var object = canvas.getActiveObject();
	  //if (!object) return;
	  if(!object) {
	  	var	activeGroup = canvas.getActiveGroup();
		if (activeGroup) {
		  var objectsInGroup = activeGroup.getObjects();
		  objectsInGroup.forEach(function(object) {
			//object[styleName] = value;
			object.set(name,value).setCoords();
		  });
		}
		else {
			return false;
		}
	  }
	  else {
		object.set(name, value).setCoords();
	  }
	  
	  canvas.renderAll();
	}
	/**
	 *  remove selected
	 */
	function removeSelected () {
		var activeObject = canvas.getActiveObject(),
			activeGroup = canvas.getActiveGroup();

		if (activeGroup) {
		  var objectsInGroup = activeGroup.getObjects();
		  canvas.discardActiveGroup();
		  objectsInGroup.forEach(function(object) {
			$('#layer-'+object.name).remove();
			canvas.remove(object);
			
		  });
		}
		else if (activeObject) {
		$('#layer-'+activeObject.name).remove();
		  canvas.remove(activeObject);
		}
	};
	/** get object by name*/
	function getObjectByName(name) {
	  var object = null,
	      objects = canvas.getObjects();
	
	  for (var i = 0, len = canvas.size(); i < len; i++) {
	    if (objects[i].name && objects[i].name === name) {
	      object = objects[i];
	      break;
	    }
	  }
	
	  return object;
	};
	

	
	
	/** img serarch
	 *  
	 */
	$('#img-search').keyup(function() {
		var val = $(this).val();
		if( val.length < 4 ) return false;
		    var USERNAME = 'takien';
			var API_KEY = '768222794b629e9ac716';
			var SEARCH_TERM = val;
			var URL = "http://pixabay.com/api/?username="+USERNAME+"&key="+API_KEY+"&search_term="+encodeURIComponent(SEARCH_TERM);
			var html='';
			$.getJSON(URL, function(data){
			if (parseInt(data.totalHits) > 0) {
				$.each(data.hits, function(i, hit){
					html += '<img data-big="thumb.php?src='+hit.webformatURL.replace('http://pixabay.com/','')+'&amp;w=640" src="'+hit.previewURL+'" />';
				});
				$('#img-result').html(html);
			}
			else {
				console.log('No hits'); 
			}
			
			
			});
	});
	
	$(document).on('click','#img-result img',function(e) {
	$('#img-result').css('opacity',0.4);

	fabric.Image.fromURL($(this).data('big'), function(img) {
		  img.set($.extend({}, Default, {
			left:0,
			top:0,
			stroke:null,
			selectable: true
			})); 
		  $('#img-result').css('opacity',1);
		  canvas.add(img);
	});
	});
	

/** clicklayer select object*/
$(document).on('click','#layer a',function(e) {
	var name = $(this).data('name');
	canvas.discardActiveGroup();
	canvas.setActiveObject(getObjectByName(name));
	e.preventDefault();
});

$('#download').click(function(e) {
	var timestamp = new Date().getUTCMilliseconds();
	$(this).attr('download','typography-'+timestamp+'.png');
	$(this).attr('href',canvas.toDataURL());
});
$('#publish').click(function(e) {
	$('#pub_preview').attr('src',canvas.toDataURL());
	$('#pubPreview').val(canvas.toDataURL());
});
$('#pubTemplate').parents('form').mouseenter(function(){
    if($('#pubTemplate').prop('checked')) {
        $('#pubJSON').val(JSON.stringify( canvas.toJSON() ));
    }
    else {
        $('#pubJSON').val('');
   }
});
$('#pubTemplate').change(function(){
    if($(this).prop('checked')) {
        $('#pubJSON').val(JSON.stringify( canvas.toJSON() ));
    }
    else {
        $('#pubJSON').val('');
   }
});
$('#pub_submit').click(function(e){
	
	$.post( site_url+"post.php", $('#pubForm').serialize(), function( response ) {
	if(response !== '0') {
	alert('Post success '+response);
	
	}
	});
	e.preventDefault();
});
/* $('#save').click(function(e) {
	var json = JSON.stringify( canvas.toJSON() );
	e.preventDefault();
}); */




//autosave
/* setInterval(function(){
	if (typeof(Storage) != "undefined") {
		localStorage.setItem("autosavecanvas", JSON.stringify( canvas.toJSON() ));
		//console.log(JSON.stringify( canvas.toJSON() ));
	} else {
		console.log("Sorry, your browser does not support Web Storage, autosave failed.");
	}
}, 10000); */

canvas.on('after:render',function(){
	if (typeof(Storage) != "undefined") {
		localStorage.setItem("autosavecanvas", JSON.stringify( canvas.toJSON() ));
	} else {
		console.log("Sorry, your browser does not support Web Storage, autosave failed.");
	}
});

if (typeof(Storage) != "undefined") {
	if(localStorage.getItem("autosavecanvas")) {
		canvas.loadFromJSON(localStorage.getItem("autosavecanvas"), function() {
		canvas.renderAll();
		});
	}
}



fallback.ready(['fabric'],function() {
	if($('#more-fonts').length < 1) {
		$('head').append('<link id="more-fonts" rel="stylesheet" href="http://fonts.googleapis.com/css?family='+morefont.join('|').replace(/ /g,'+')+'"/>');
	}
});


fallback.ready(['jQuery.ui'], function() {
	$('#canvas-wrap').resizable({
		resize: function( event, ui ) {
			var c_w = ui.size.width-2,
			    c_h = ui.size.height-($(this).find('.panel-heading').outerHeight())-2; 
			
			/* if($('#scale_object').prop('checked')) {
				$(this).find('canvas').css({
					width :c_w,
					height:c_h
				});
			}
			else { */
				canvas.setWidth(c_w);
				canvas.setHeight(c_h);
			//}
			
			$(this).find('.panel-body').css('float','left');
			$(this).find('.panel-title span').html('('+c_w+' x '+c_h+' pixels)');
		},
		minWidth: 200+2,
		maxWidth: $('#main').innerWidth()-15,
		minHeight: 200+(($(this).find('.panel-heading').outerHeight())+2),
		maxHeight: 1500
	});
	$('.resizable').resizable({
	
	});
});

//plupload
fallback.ready(['plupload'], function() {
		var uploader = new plupload.Uploader({
			runtimes : 'html5,flash',
			browse_button : 'upload',
			//container: 'container',
			url: site_url+"upload.php",
			max_file_size : '10mb',
			filters : [
				{title : "Image files", extensions : "jpg,gif,png"}
			],
			flash_swf_url : site_url+'js/Moxie.swf',
			unique_names:true,
			resize: {
			  width: 800,
			  height: 500,
			  crop: false
			}
		});
		uploader.init();
		uploader.bind('FilesAdded', function(up, files) {
			uploader.start();
		});
		uploader.bind('FileUploaded', function(up, files,info) {
			var response = jQuery.parseJSON(info.response);
			fabric.Image.fromURL(site_url+'/'+response.path, function(img) {
			  img.set({
				left:0,
				top:0,
				stroke:null,
				selectable: true
				}); 
			  canvas.add(img);
			  canvas.renderAll();
		});
		});
});



}); //fabric ready



document.getElementById('body').style.overflow = 'auto';
});