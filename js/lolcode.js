CodeMirror.defineSimpleMode("lolcode", {
	arguments: [],
	meta: {
		lineComment: "BTW"
	},
	start: [
		{regex: /HAI/, token: "atom" },
		{regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
		{regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number"},
		{regex: /BTW.*/, token: "comment"},
		{regex: /KTHXBYE/, token: "atom"}
	]
});