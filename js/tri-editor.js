// Initialization
$(document).ready(function() {
	html.refresh();
	css.refresh();
	js.refresh();
/* 	html.setValue(localStorage.getItem('currentHtml'));
	css.setValue(localStorage.getItem('currentCss'));
	js.setValue(localStorage.getItem('currentJs'));
	head.setValue(localStorage.getItem('currentHead'));
	plugins.setValue(localStorage.getItem('currentPlugins')); */
});



// Main editors
var html = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
	mode: 'htmlmixed',
	theme: 'kokomo-syntax',
	lineWrapping: true,
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	matchTags: {bothTags: true},
	extraKeys: {'Ctrl-J': 'toMatchingTag'},
	smartIndent: true,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true,
	scrollPastEnd: true
});
emmetCodeMirror(html, {
	'Tab': 'emmet.expand_abbreviation_with_tab',
	'Cmd-Alt-B': 'emmet.balance_outward'
});
var css = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
	mode: 'text/css',
	theme: 'kokomo-syntax',
	lineWrapping: true,
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	smartIndent: true,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true,
	scrollPastEnd: true
});
var js = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
	mode: 'text/javascript',
	theme: 'kokomo-syntax',
	lineWrapping: true,
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	smartIndent: true,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true,
	scrollPastEnd: true
});



// Config dialogues
var head = CodeMirror.fromTextArea(document.getElementById('head'), {
	mode: 'htmlmixed',
	theme: 'kokomo-syntax',
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	smartIndent: true,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true
});
var plugins = CodeMirror.fromTextArea(document.getElementById('plugins'), {
	mode: 'htmlmixed',
	theme: 'kokomo-syntax',
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	smartIndent: true,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true
});



// Draggable slider between halves
Split(['.code-half', '.result-half'], {
	minSize: 350,
	snapOffset: 0
});



// Update result
$('.run').click(function() {
	var result = document.getElementById('result');
		result = result.contentWindow || result.contentDocument.document || result.contentDocument;
	meat = `<!DOCTYPE html>
			<html>

			<head>
				${head.getValue()}
				<style>
				${css.getValue()}
				</style>
			</head>

			<body>
				${html.getValue()}
				<script>
				${js.getValue()}
				</scr`+`ipt>
				${plugins.getValue()}
			</body>

			</html>`;
	result.document.open();
	result.document.write(meat);
	result.document.close();

	$('.export-button').removeClass('disabled');
});



// Save editor values
$('.save').click(function() {
	alert('Heads up: Proper saving hasn\'t been implemented yet.');
/* 	localStorage.setItem('currentHtml', html.getValue());
	localStorage.setItem('currentCss', css.getValue());
	localStorage.setItem('currentJs', js.getValue());
	localStorage.setItem('currentHead', head.getValue());
	localStorage.setItem('currentPlugins', plugins.getValue()); */
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
	else $('.result-container').removeClass('mobile-result');
});



// Settings
$('.settings-select').click(function() {
	$('.settings-dropdown').toggleClass('settings-show');
});

$('input[type="radio"][name="layout"]').change(function() {
	if ($(this).is('#layers-layout')) {
		notBoxes();
		if ($('.code-container').find('.gutter').length > 0) stackSplit.destroy();
		$('.code-container').attr('class', 'code-container layers');
	}

	if ($(this).is('#stack-layout')) {
		notBoxes();
		$('.code-container').attr('class', 'code-container stack');
		stackSplit = Split(['.js', '.css', '.html'], {
			direction: 'vertical',
			minSize: 80,
			snapOffset: 0
		});
	}

	if ($(this).is('#boxes-layout')) {
		if ($('.code-container').find('.gutter').length > 0) stackSplit.destroy();
		$('.code-container').attr('class', 'code-container boxes');
		$('.box-cycler').css('display', 'flex');
	}
});

function notBoxes() {
	$('.code-container').prepend($('.html'));
	$('.code-container').prepend($('.css'));
	$('.code-container').prepend($('.js'));
	$('.code-box').css({'animation': 'none', 'opacity': '1'});
	$('.box-cycler').css('display', 'none');
}

$('.box-cycler').click(function() {
	function rotate(deg) {
		$('.box-cycler svg').css('transform', 'rotate(' + deg + 'deg)');
		setTimeout(function() {if (deg < 180) rotate(deg + 5)});
	}
	rotate(0);
	$('.box-cycler svg').css('transform', 'rotate(0deg)');
	$('.code-container').prepend($('.code-container .code-box:last'));
	$('.code-box').css({'animation': 'none', 'opacity': '1'});
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
	$('.body-block').show();
	if ($(this).parent().parent().is('.html')) {
		$('.html-config').show();
		head.refresh();
		head.focus();
		head.setCursor(head.lineCount(), 0);
	}
	if ($(this).parent().parent().is('.js')) {
		$('.js-config').show();
		plugins.refresh();
		plugins.focus();
		plugins.setCursor(plugins.lineCount(), 0);
	}
});

$('.save-close').click(function() {
	$('.body-block').hide();
	$('.config-dialogue').hide();
});



// Head presets
$('.preset').click(function() {
	if ($('.html-config').is(':visible')) {
		if ($(this).is('#charset-preset')) head.replaceSelection('<meta charset="UTF-8">');
		if ($(this).is('#viewport-preset')) head.replaceSelection('<meta name="viewport" content="width=device-width, initial-scale=1">');
		head.focus();
		head.setCursor(head.lineCount(), 0);
	}

	if ($('.js-config').is(':visible')) {
		if ($(this).is('#jquery-preset')) plugins.replaceSelection('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');
		if ($(this).is('#react-preset')) plugins.replaceSelection('<script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/umd/react.production.min.js"></script>');
		if ($(this).is('#angular-preset')) plugins.replaceSelection('<script src="https://cdnjs.cloudflare.com/ajax/libs/angular/10.2.1/core.umd.min.js"></script>');
		if ($(this).is('#vue-preset')) plugins.replaceSelection('<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>');
		plugins.focus();
		plugins.setCursor(plugins.lineCount(), 0);
	}
});



// Export file
$('.export-button').click(function() {
	var meatBlob = new Blob([meat], {type: 'text/plain'});
	$(this).attr('href', URL.createObjectURL(meatBlob));
});