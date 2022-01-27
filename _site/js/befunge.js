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



samples = {
commas:`
"dlroW olleH" ,,,,,,,,,,, @
`,

loop:`
v

                  v  ,  <

>  "dlroW olleH"  >  :  |

                        @
`,

bridge:`
"dlroW olleH">:#,_@
`,

random3:`
 v
v?v
123
>v<
 .
 @
`,

random9:`
    v
 v  ?  v
    v   
v?vv?vv?v
123456789
>>>>v<<<<
    .
    @
`,

pi:`
"^a&EPm=kY}t/qYC+i9wHye$m N@~x+"v
"|DsY<"-"z6n<[Yo2x|UP5VD:">:#v_@>
-:19+/"0"+,19+%"0"+,      ^  >39*
`
}