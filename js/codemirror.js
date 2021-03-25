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
	scrollPastEnd: true,
	autoRefresh: true
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
	scrollPastEnd: true,
	autoRefresh: true
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
	scrollPastEnd: true,
	autoRefresh: true
});



// Config dialogues
var head = CodeMirror.fromTextArea(document.getElementById('head'), {
	mode: 'htmlmixed',
	theme: 'kokomo-syntax',
	lineWrapping: true,
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	smartIndent: true,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true,
	autoRefresh: true
});
var plugins = CodeMirror.fromTextArea(document.getElementById('plugins'), {
	mode: 'htmlmixed',
	theme: 'kokomo-syntax',
	lineWrapping: true,
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	smartIndent: true,
	tabSize: 4,
	indentUnit: 4,
	indentWithTabs: true,
	autoRefresh: true
});