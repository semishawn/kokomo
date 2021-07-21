// Initialization
$(document).ready(function() {
	$('.CodeMirror').each((i, e) => e.CodeMirror.refresh());
/* 	html.setValue(localStorage.getItem('currentHtml'));
	css.setValue(localStorage.getItem('currentCss'));
	js.setValue(localStorage.getItem('currentJs'));
	head.setValue(localStorage.getItem('currentHead'));
	plugins.setValue(localStorage.getItem('currentPlugins')); */
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
				${plugins.getValue()}
				<script>
				${js.getValue()}
				</scr`+`ipt>
			</body>

			</html>`;
	result.document.open();
	result.document.write(meat);
	result.document.close();
	$('#result').contents().find('body').css('transform-origin', 'left top');
	$('.export-button').removeClass('disabled');
	zoom();
});



// Save editor values
$('.save').click(function() {
	alert('Heads up: Proper saving hasn\'t been implemented yet.');
/* 	localStorage.setItem('currentHtml', html.getValue());
	localStorage.setItem('currentCss', css.getValue());
	localStorage.setItem('currentJs', js.getValue());
	localStorage.setItem('currentHead', head.getValue());
	localStorage.setItem('currentPlugins', plugins.getValue());
	$('.save').addClass('saved');
	$('.save svg').attr('class', 'fas fa-check');
	setTimeout(function() {
		$('.save').removeClass('saved');
		$('.save svg').attr('class', 'far fa-save');
	}, 700); */
});



// Bring editor to front on click
maxZ = $('.code-box:last').css('z-index');
$('.code-box').click(function() {
	maxZ++;
	$(this).css('z-index', maxZ);
});



// Change result size
$('input[name="result-size"]').change(function() {
	if ($(this).is('#mobile-size')) $('.result-container').addClass('mobile-result');
	else $('.result-container').removeClass('mobile-result');
});

// Change result zoom
$('input[name="result-zoom"]').change(function() {zoom()});
function zoom() {
	if ($('#zoom1').is(':checked')) $('#result').css({'transform': 'scale(1)'});
	if ($('#zoom2').is(':checked')) $('#result').css({'transform': 'scale(2)'});
	if ($('#zoom3').is(':checked')) $('#result').css({'transform': 'scale(3)'});
}



// Settings
$('.settings-select').click(() => $('.settings-dropdown').toggleClass('show'));

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



// Choose line wrapping and line numbers
$('#line-wrapping').change(function() {
	if (!$(this).is(':checked')) $('.CodeMirror').each((i, e) => e.CodeMirror.setOption('lineWrapping', false));
	else $('.CodeMirror').each((i, e) => e.CodeMirror.setOption('lineWrapping', true));
});
$('#line-numbers').change(function() {
	if (!$(this).is(':checked')) $('.CodeMirror').each((i, e) => e.CodeMirror.setOption('lineNumbers', false));
	else $('.CodeMirror').each((i, e) => e.CodeMirror.setOption('lineNumbers', true));
});



// Show/hide config
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
	if ($(this).parent().parent().parent().is('.html-config')) {
		if ($(this).is('#charset-preset')) head.replaceSelection('<meta charset="UTF-8">');
		if ($(this).is('#viewport-preset')) head.replaceSelection('<meta name="viewport" content="width=device-width, initial-scale=1">');
		head.focus();
		head.setCursor(head.lineCount(), 0);
	}

	if ($(this).parent().parent().parent().is('.js-config')) {
		if ($(this).is('#jquery-preset')) plugins.replaceSelection('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');
		if ($(this).is('#react-preset')) plugins.replaceSelection('<script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/umd/react.production.min.js"></script>');
		if ($(this).is('#angular-preset')) plugins.replaceSelection('<script src="https://cdnjs.cloudflare.com/ajax/libs/angular/10.2.1/core.umd.min.js"></script>');
		if ($(this).is('#vue-preset')) plugins.replaceSelection('<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>');

		if ($(this).is('#bootstrap-preset')) {
			plugins.replaceSelection('<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/js/bootstrap.min.js"></script>');
			head.replaceSelection('<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css"></script>');
		}

		plugins.focus();
		plugins.setCursor(plugins.lineCount(), 0);
	}
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