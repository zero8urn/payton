(function () {
'use strict';

var payton = payton || {};

//Get request for images. Uses callback to manipulate the images array
payton.getImagesRequest = function imageRequest(url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
            callback(request.responseText);
          }
	};
	request.send();
}

payton.getImageArray = function imageArray(data) {
	//var baseURL = 'https://drive.google.com/uc?export=view&id='  
	var images = JSON.parse(data);
	console.log(images);
	var elImgContainer = document.getElementById('img_container');
	images.items.forEach(function (el) {
		var splitThumbnail = el.thumbnailLink.split('=');
		var div = document.createElement('div');
		div.setAttribute('class', 'box');
		var imgTemplate = '<div class="img_holster" style="background-image: url('+ splitThumbnail[0] +'=w1890-h820);background-repeat: no-repeat; ;background-position: center;  background-size: cover;">' +
							// '<img src= ' + splitThumbnail[0] + '=w1890-h820' + ' />' +	
					  		'</div>'

		div.innerHTML = imgTemplate;
		
		elImgContainer.appendChild(div);
	});
}

payton.getImagesRequest('http://localhost:6969/data',payton.getImageArray);

})();

	// var imgTemplate = '<div class="img_holster" style="background-image: url('+ splitThumbnail[0] +'=w1890-h820);background-repeat: no-repeat; ;background-position: center;  background-size: cover;">' +
	// 							// '<img src= ' + splitThumbnail[0] + '=w1890-h820' + ' />' +	

	// 					  '</div>'