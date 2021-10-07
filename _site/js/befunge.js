CodeMirror.defineSimpleMode("befunge", {
	arguments: [],
	start: [
		{regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
		{regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number"},
		{regex: /</, token: "atom"},
		{regex: />/, token: "atom"},
		{regex: /\^/, token: "atom"},
		{regex: /v/, token: "atom"}
	]
});