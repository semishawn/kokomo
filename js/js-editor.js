// Draggable slider between halves
Split(['.js-half', '.console-half'], {
	minSize: 350,
	snapOffset: 0
});



// JS Codemirror
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
js.refresh();
js.focus();



// Settings
$('.settings-select').click(function() {
	$('.settings-dropdown').toggleClass('settings-show');
});
$('#line-wrapping').change(function() {
	if (!$(this).is(':checked')) js.setOption('lineWrapping', false);
	else js.setOption('lineWrapping', true);
});
$('#line-numbers').change(function() {
	if (!$(this).is(':checked')) js.setOption('lineNumbers', false);
	else js.setOption('lineNumbers', true);
});



$('.run').click(function() {
	console.log(js.getValue());
	logMessages.each(function() {
		alert(this);
	});
});

var logBackup = console.log;
var logMessages = [];

console.log = function() {
	logMessages.push.apply(logMessages, arguments);
	logBackup.apply(console, arguments);
};
