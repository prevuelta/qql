import * as ohm from "ohm-js";
import * as path from "path";
import * as fs from "fs";
const grammarPath = path.join(import.meta.dirname, "./gglGrammar.ohm");

const contents = fs.readFileSync(grammarPath, "utf8");

const gglGrammar = ohm.grammar(
  String.raw`
 Ggl <: IndentationSensitive {
   Program = CommandAndArgs+
   CommandAndArgs = Indent Command ":" CommandArguments eol?
   Command = "d" --documentCommand
   		| "sg" --squareGridCommand
      | "p" --pathCommand
   Indent = (space | newline)*
   CommandArguments = Arg*
   Arg = singleArg | doubleArg
   singleArg = ("x" | "y" | "u" | "a" | digit)+ ","?
   doubleArg = singleArg singleArg ","
   eol = newline | end
   newline = "\\r\\n" | "\\r" | "\\n"
 }
`,
  { IndentationSensitive: ohm.ExperimentalIndentationSensitive },
);

const userInput = `
d:a a 10
 sg:2 4 10 4
 p:1u 0, 0 1u
 p:0 0,1uxy
`;

const m = gglGrammar.match(userInput);

if (m.succeeded()) {
  console.log("Success!");
} else {
  console.log("-----\nFailure", m.message);
}
