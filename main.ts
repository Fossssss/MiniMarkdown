// main.js
import { parseMarkdown } from './parsers/parser'
import { render } from './renders/render'
const text = `1. 父亲
  2. 儿子
    2. 儿子
      2. 儿子
        2. 儿子
          2. 儿子
`

const parsedTokens = parseMarkdown(text)
console.log(render(parsedTokens))
