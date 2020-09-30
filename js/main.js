$(document).ready(function() {
	var hex1 = '#';
	var hex2 = '#';
	var hex3 = '#';
	var hex4 = '#';
	var values = "0123456789ABCDEF";
	for (var i = 0; i < 6; i++) {
		hex1 += values[(Math.floor(Math.random() * 16))];
		hex2 += values[(Math.floor(Math.random() * 16))];
		hex3 += values[(Math.floor(Math.random() * 16))];
		hex4 += values[(Math.floor(Math.random() * 16))];
	};
	$("body").css("background", "linear-gradient(90deg," + hex1 + ", " + hex2 + ")");
	$("<style>body:before{background: linear-gradient(90deg," + hex3 + ", " + hex4 + ");}</style>").appendTo('head');
});


maxZ = $('.code-box:last').css('z-index');
$('.code-box').click(function() {
	maxZ++;
	$(this).css('z-index', maxZ);
});


function updateResult() {
	var contents = '<style>' + css.getValue() + '</style>' + html.getValue() + '<script>' + js.getValue() + '</script>';
	$('.result').contents().find('body').html(contents);
}
$('.run').click(function() {
	updateResult();
});


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


Split(['.code-half', '.result-half'], {
	minSize: 350,
	snapOffset: 0,
});

$('.format-container').click(function() {
	if ($('#stacked-format').is(':checked')) {
		$('link[href="css/format2.css"]').attr('href','css/format1.css');
	};
	if ($('#codepen-format').is(':checked')) {
		$('link[href="css/format1.css"]').attr('href','css/format2.css');
	};
});

function format() {
	Split(['.js', '.css', '.html'], {
		direction: 'vertical',
		sizes: [25, 25, 50],
		minSize: 100,
		snapOffset: 0,
	});
};