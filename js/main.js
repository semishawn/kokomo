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


// Switch editor layouts
$('.layout-select').click(function() {
	$('.layout-options').toggleClass('flex');
});
$('input[type="radio"][name="layout"]').change(function() {
	if ($(this).is('#layered-layout')) $('.code-container').attr('class', 'code-container layered');
	if ($(this).is('#stacked-layout')) $('.code-container').attr('class', 'code-container stacked');
	if ($(this).is('#boxes-layout')) $('.code-container').attr('class', 'code-container boxes');
	if ($(this).is('#tabs-layout')) $('.code-container').attr('class', 'code-container tabs');
});


// layout switch function
function horizontalSplit() {
	Split(['.js', '.css', '.html'], {
		direction: 'vertical',
		sizes: [100/3, 100/3, 100/3],
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