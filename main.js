// main.js
import { parseMarkdown } from './parser.js'
import { render } from './renders/render.js'
const text = `- Item 1`

const parsedTokens = parseMarkdown(text)
console.log(render(parsedTokens))
