var html = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
	mode: 'htmlmixed',
	theme: 'semi',
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
	theme: 'semi',
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
	theme: 'semi',
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

var head = CodeMirror.fromTextArea(document.getElementById('head'), {
	mode: 'htmlmixed',
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	smartIndent: true,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true
});
emmetCodeMirror(head, {
	'Tab': 'emmet.expand_abbreviation_with_tab',
	'Cmd-Alt-B': 'emmet.balance_outward'
});
head.setCursor({line: 2});



// Fix numbers not showing bug
$(document).ready(function() {
	html.refresh();
	css.refresh();
	js.refresh();
});