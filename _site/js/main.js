// Draggable slider between halves
Split([".code-half", ".result-half"], {
	minSize: 350,
	snapOffset: 0
});



// General information dropdown
$(".logo").click(() => $(".info-dropdown").toggleClass("show"));



// Close dropdowns on click elsewhere
$(document).click(function(e) {
	if (!$(e.target).closest(".settings").length) $(".settings-dropdown").removeClass("show");
	if (!$(e.target).closest(".info-container").length) $(".info-dropdown").removeClass("show");
	if (!$(e.target).closest(".samples-btn").length) $(".samples-dropdown").removeClass("show");
	$("#result").contents().click(function() {
		$(".info-dropdown").removeClass("show");
		$(".settings-dropdown").removeClass("show");
		$(".samples-dropdown").removeClass("show");
	});
});



// Export functionality
$(".run").click(function() {
	$(".export-btn").removeClass("disabled");
});



// Save editor values
$(".save").click(function() {
	alert("Heads up: Proper saving hasn't been implemented yet.");
/* 	localStorage.setItem("currentHtml", html.getValue());
	localStorage.setItem("currentCss", css.getValue());
	localStorage.setItem("currentJs", js.getValue());
	localStorage.setItem("currentHead", head.getValue());
	localStorage.setItem("currentPlugins", plugins.getValue());
	$(".save").addClass("saved");
	$(".save svg").attr("class", "fas fa-check");
	setTimeout(function() {
		$(".save").removeClass("saved");
		$(".save svg").attr("class", "far fa-save");
	}, 700); */
});



// Clear everything
$(".reset").click(function() {
	$(".CodeMirror").each((i, e) => e.CodeMirror.setValue(""));
	$("#console").html("");
	if (typeof result !== "undefined") {
		result.document.open();
		result.document.write("");
		result.document.close();
	}
});



// Bring editor to front on click
maxZ = $(".code-box:last").css("z-index");
$(".code-box").click(function() {
	maxZ++;
	$(this).css("z-index", maxZ);
});



// Settings
$(".settings-select").click(() => $(".settings-dropdown").toggleClass("show"));

$("#line-wrapping").change(function() {
	if (!$(this).is(":checked")) $(".CodeMirror").each((i, e) => e.CodeMirror.setOption("lineWrapping", false));
	else $(".CodeMirror").each((i, e) => e.CodeMirror.setOption("lineWrapping", true));
});
$("#line-numbers").change(function() {
	if (!$(this).is(":checked")) $(".CodeMirror").each((i, e) => e.CodeMirror.setOption("lineNumbers", false));
	else $(".CodeMirror").each((i, e) => e.CodeMirror.setOption("lineNumbers", true));
});



// Exit config dialogues
$(".save-close").click(function() {
	$(".body-block").hide();
	$(".config-dialogue").hide();
});



// Toggle samples dropdown
$(".samples-btn").click(function() {
	$(".samples-dropdown").toggleClass("show");
});



// Clear console
$(".console-clear-btn").click(function() {
	$("#console").html("");
});



// If editors have been changed, ask before closing
/* window.onbeforeunload = function() {
	var valuesCheck = "";
	$(".CodeMirror").each((i, e) => valuesCheck += e.CodeMirror.getValue());
	if (valuesCheck != "") return "";
} */