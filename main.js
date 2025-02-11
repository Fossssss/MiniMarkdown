// main.js
import { parseMarkdown } from './parser.js'
import { render } from './render.js'
const text = `- Item 1
- Item 1.1
- Item 1.2
- Item 2

`

const parsedTokens = parseMarkdown(text)
console.log(render(parsedTokens))
