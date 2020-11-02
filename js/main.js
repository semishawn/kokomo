// Generator random hex color
function randhex() {
	return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}


// Initialization
$(document).ready(function() {
	$('body').css('background', `linear-gradient(90deg, ${randhex()}, ${randhex()})`);
	$('head').append(`<style>body:before{background: linear-gradient(90deg, ${randhex()}, ${randhex()});}</style>`);

	/* html.setValue(localStorage.getItem('currentHtml'));
	head.setValue(localStorage.getItem('currentHead'));
	css.setValue(localStorage.getItem('currentCss'));
	js.setValue(localStorage.getItem('currentJs')); */
});


// Save editor values
/* $('.save').click(function() {
	localStorage.setItem('currentHtml', html.getValue());
	localStorage.setItem('currentHead', head.getValue());
	localStorage.setItem('currentCss', css.getValue());
	localStorage.setItem('currentJs', js.getValue());
}); */


// Update result
$('.run').click(function() {
	var result = document.getElementById('result');
		result = result.contentWindow || result.contentDocument.document || result.contentDocument;
	var contents = `
		<!DOCTYPE html>
		<html>

		<head>
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
$('input[type="radio"][name="result-size"]').change(function() {
	if ($(this).is('#mobile-size')) $('.result-container').addClass('mobile-result');
	if ($(this).is('#desktop-size')) $('.result-container').removeClass('mobile-result');
});


// Draggable slider between halves
Split(['.code-half', '.result-half'], {
	minSize: 350,
	snapOffset: 0,
});


// Settings
$('.settings-select').click(function() {
	$('.settings-dropdown').toggleClass('flex');
});
$('input[type="radio"][name="layout"]').change(function() {
	if ($(this).is('#layers-layout')) $('.code-container').attr('class', 'code-container layers');
	if ($(this).is('#stack-layout')) $('.code-container').attr('class', 'code-container stack');
	if ($(this).is('#boxes-layout')) $('.code-container').attr('class', 'code-container boxes');
	if ($(this).is('#tabs-layout')) $('.code-container').attr('class', 'code-container tabs');
});
$('#line-wrapping').change(function() {
	if (!$(this).is(':checked')) {
		html.setOption('lineWrapping', false);
		css.setOption('lineWrapping', false);
		js.setOption('lineWrapping', false);
	}
	else {
		html.setOption('lineWrapping', true);
		css.setOption('lineWrapping', true);
		js.setOption('lineWrapping', true);
	}
});
$('#line-numbers').change(function() {
	if (!$(this).is(':checked')) {
		html.setOption('lineNumbers', false);
		css.setOption('lineNumbers', false);
		js.setOption('lineNumbers', false);
	}
	else {
		html.setOption('lineNumbers', true);
		css.setOption('lineNumbers', true);
		js.setOption('lineNumbers', true);
	}
});


// Show/hide html config
$('.config-button').click(function() {
	$('.html-config').toggle();
	head.refresh();
	head.focus();
	head.setCursor(head.lineCount(), 0);
});

$('.save-close').click(function() {
	$('.html-config').hide();
});


// Head presets
$('.head-preset').click(function() {
	if ($(this).is('#charset-preset')) head.setValue(head.getValue() + '<meta charset="UTF-8">\n');

	if ($(this).is('#viewport-preset')) head.setValue(head.getValue() + '<meta name="viewport" content="width=device-width, initial-scale=1">\n');

	if ($(this).is('#jquery-preset')) head.setValue(head.getValue() + '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n');

	if ($(this).is('#react-preset')) head.setValue(head.getValue() + '<script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/umd/react.production.min.js"></script>\n');

	if ($(this).is('#angular-preset')) head.setValue(head.getValue() + '<script src="https://cdnjs.cloudflare.com/ajax/libs/angular/10.2.1/core.umd.min.js"></script>\n');

	if ($(this).is('#vue-preset')) head.setValue(head.getValue() + '<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>\n');

	head.focus();
	head.setCursor(head.lineCount(), 0);
});