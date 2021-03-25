// Initialization
$(document).ready(function() {
	$('.CodeMirror').each((i, e) => e.CodeMirror.refresh());
	// html.setValue(localStorage.getItem('currentHtml'));
});



// Draggable slider between halves
Split(['.code-half', '.result-half'], {
	minSize: 350,
	snapOffset: 0
});



// General information dropdown
$('.logo').click(() => $('.info-dropdown').toggleClass('show'));



// Close dropdowns on click elsewhere
$(document).click(function(e) {
	if (!$(e.target).closest('.settings').length) $('.settings-dropdown').removeClass('show');
	if (!$(e.target).closest('.info-container').length) $('.info-dropdown').removeClass('show');
	$('#result').contents().click(function() {
		$('.info-dropdown').removeClass('show');
		$('.settings-dropdown').removeClass('show');
	});
});



// Update result
$('.run').click(function() {
	var result = document.getElementById('result');
		result = result.contentWindow || result.contentDocument.document || result.contentDocument;
	meat = html.getValue();
	result.document.open();
	result.document.write(meat);
	result.document.close();
	$('.export-button').removeClass('disabled');
	zoom();
});



// Save editor values
$('.save').click(function() {
	alert('Heads up: Proper saving hasn\'t been implemented yet.');
/* 	localStorage.setItem('currentHtml', html.getValue());
	$('.save').addClass('saved');
	$('.save svg').attr('class', 'fas fa-check');
	setTimeout(function() {
		$('.save').removeClass('saved');
		$('.save svg').attr('class', 'far fa-save');
	}, 700); */
});



// Change result size
$('input[name="result-size"]').change(function() {
	if ($(this).is('#mobile-size')) $('.result-container').addClass('mobile-result');
	else $('.result-container').removeClass('mobile-result');
});

// Change result zoom
$('input[name="result-zoom"]').change(() => zoom());
function zoom() {
	if ($('#zoom1').is(':checked')) $('#result').css({'transform': 'scale(1)'});
	if ($('#zoom2').is(':checked')) $('#result').css({'transform': 'scale(2)'});
	if ($('#zoom3').is(':checked')) $('#result').css({'transform': 'scale(3)'});
}


// Toggle settings container
$('.settings-select').click(() => $('.settings-dropdown').toggleClass('show'));

// Choose line wrapping and line numbers
$('#line-wrapping').change(function() {
	if (!$(this).is(':checked')) $('.CodeMirror').each((i, e) => e.CodeMirror.setOption('lineWrapping', false));
	else $('.CodeMirror').each((i, e) => e.CodeMirror.setOption('lineWrapping', true));
});
$('#line-numbers').change(function() {
	if (!$(this).is(':checked')) $('.CodeMirror').each((i, e) => e.CodeMirror.setOption('lineNumbers', false));
	else $('.CodeMirror').each((i, e) => e.CodeMirror.setOption('lineNumbers', true));
});



// Export file
$('.export-button').click(function() {
	var meatFormatted = '<!--\n\tUpon export, some styling and configuration filters are applied.\n\tTabs, spaces, new lines, and white space may need to be manually adjusted.\n-->\n' + meat.replaceAll('\t', '');
	var meatBlob = new Blob([meatFormatted], {type: 'text/plain'});
	$(this).attr('href', URL.createObjectURL(meatBlob));
});



// If editors have been changed, ask before closing
window.onbeforeunload = function() {
	var valuesCheck = '';
	$('.CodeMirror').each((i, e) => valuesCheck += e.CodeMirror.getValue());
	if (valuesCheck != '') return '';
}