// Generator random hex color
function randhex() {
	return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}


// Initialization
$(document).ready(function() {
	$('body').css('background', `linear-gradient(90deg, ${randhex()}, ${randhex()})`);
	$('head').append(`<style>body:before{background: linear-gradient(90deg, ${randhex()}, ${randhex()});}</style>`);

	html.setValue(localStorage.getItem('currentHtml'));
	head.setValue(localStorage.getItem('currentHead'));
	css.setValue(localStorage.getItem('currentCss'));
	js.setValue(localStorage.getItem('currentJs'));
});


// Save editor values
$('.save').click(function() {
	localStorage.setItem('currentHtml', html.getValue());
	localStorage.setItem('currentHead', head.getValue());
	localStorage.setItem('currentCss', css.getValue());
	localStorage.setItem('currentJs', js.getValue());
});


// Update result
$('.run').click(function() {
	var result = document.getElementById('result');
		result = result.contentWindow || result.contentDocument.document || result.contentDocument;
	var contents = `
		<!DOCTYPE html>
		<html>

		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			${head.getValue()}
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
});


// Bring editor to front on click
maxZ = $('.code-box:last').css('z-index');
$('.code-box').click(function() {
	maxZ++;
	$(this).css('z-index', maxZ);
});


// Change result size
$('.resize-icon-container').click(function() {
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
	if ($(this).is('#layers-layout')) $('.code-container').attr('class', 'code-container layers');
	if ($(this).is('#stack-layout')) $('.code-container').attr('class', 'code-container stack');
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


$('.head-toggle').click(function() {
	$('.head').show();
	head.refresh();
	head.focus();
});
$('.save-and-close').click(function() {
	$('.head').hide();
});