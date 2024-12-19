import * as ohm from "ohm-js";
import * as path from "path";
import * as fs from "fs";
const grammarPath = path.join(import.meta.dirname, "./gglGrammar.ohm");

const contents = fs.readFileSync(grammarPath, "utf8");

const gglGrammar = ohm.grammar(`
 Ggl <: IndentationSensitive {
   Command = CommandIdentifier ":" CommandArguments
   CommandIdentifier = "d" | ""
   CommandArguments = CommandArg*
   CommandArg 
 }
`, { IndentationSensitive: ohm.ExperimentalIndentationSensitive});

const userInput = `
d:a a 0
`;

const m = gglGrammar.match(userInput);

if (m.succeeded()) {
  console.log("Greetings, human.");
} else {
  console.log("That's not a greeting!");
}
