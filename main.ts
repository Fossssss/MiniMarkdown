// main.js
import { parseMarkdown } from './parsers/parser'
import { render } from './renders/render'
const text = `# 一级标题
## 二级标题
1. 列表项1
    1. 子列表
1. 列表项2
`

const parsedTokens = parseMarkdown(text)
console.log(render(parsedTokens))
