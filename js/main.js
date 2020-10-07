// Generator random hex color
function randhex() {
	return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

// Random background mesh
$(document).ready(function() {
	var hex1 = randhex();
	var hex2 = randhex();
	var hex3 = randhex();
	var hex4 = randhex();
	$('body').css('background', `linear-gradient(90deg, ${hex1}, ${hex2})`);
	$(`<style>body:before{background: linear-gradient(90deg, ${hex3}, ${hex4});}</style>`).appendTo('head');
});


// Bring editor to front on click
maxZ = $('.code-box:last').css('z-index');
$('.code-box').click(function() {
	maxZ++;
	$(this).css('z-index', maxZ);
});


// Update preview
function updateResult() {
	var result = document.getElementById('result');
		result = result.contentWindow || result.contentDocument.document || result.contentDocument;
	var contents = `
		<!DOCTYPE html>
		<html>

		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<script src="https://code.jquery.com/jquery-3.5.1.min.js"></scr`+`ipt>
			<style>${css.getValue()}</style>
		</head>

		<body>
			${html.getValue()}
			<script>${js.getValue()}</scr`+`ipt>
		</body>

		</html>`;
	result.document.open();
	result.document.write(contents);
	result.document.close();
}


// Change result size
$('.result-size-container').click(function() {
	if ($('#desktop-size').is(':checked')) {
		$('.result-container').css({
			'width': '100%',
			'max-height': '100%'
		});
	};
	if ($('#mobile-size').is(':checked')) {
		$('.result-container').css({
			'width': '2.79in',
			'max-height': '5.65in'
		});
	};
});


// Draggable slider between halves
Split(['.code-half', '.result-half'], {
	minSize: 350,
	snapOffset: 0,
});


// Switch editor formats
$('.format-container').click(function() {
	if ($('#stacked-format').is(':checked')) {
		$('link[href="css/format2.css"]').attr('href','css/format1.css');
	};
	if ($('#codepen-format').is(':checked')) {
		$('link[href="css/format1.css"]').attr('href','css/format2.css');
	};
});


// Format switch function
function format() {
	Split(['.js', '.css', '.html'], {
		direction: 'vertical',
		sizes: [25, 25, 50],
		minSize: 100,
		snapOffset: 0,
	});
}


// Fix numbers not showing bug
$(document).ready(function() {
	html.refresh();
	css.refresh();
	js.refresh();
});