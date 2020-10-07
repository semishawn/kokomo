var html = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
	mode: 'htmlmixed',
	theme: 'semi',
	lineWrapping: true,
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	matchTags: {bothTags: true},
	extraKeys: {'Ctrl-J': 'toMatchingTag'},
	smartIndent: false,
	lineWrapping: false,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true,
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
	lineWrapping: false,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true,
});

var js = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
	mode: 'text/javascript',
	theme: 'semi',
	lineWrapping: true,
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	smartIndent: true,
	lineWrapping: false,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true,
});