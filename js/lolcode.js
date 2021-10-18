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



samples = {
visible:`
HAI 1.3
	VISIBLE \"Hello world!\"
KTHXBYE
`,

increment:`
HAI 1.3
	I HAS A var ITZ 0
	IM IN YR loop UPPIN YR var TIL BOTH SAEM var AN 10
		VISIBLE SUM OF var AN 1
	IM OUTTA YR loop
KTHXBYE
`,

exponent:`
HAI 1.3
	HOW IZ I exponentFunction YR base AN YR exp
		I HAS A index ITZ 0
		I HAS A total ITZ 1

		IM IN YR loop UPPIN YR index TIL BOTH SAEM index AN exp
			total R PRODUKT OF total AN base
		IM OUTTA YR loop

		FOUND YR total
	IF U SAY SO
		
	VISIBLE I IZ exponentFunction YR 2 AN YR 4 MKAY
KTHXBYE
`
}