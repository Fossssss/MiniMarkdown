// parser.js
import Token from '../token'
import { parseHeadings } from './headingParser'
import { parseParagraphs } from './paragraphParser'
import { createListParser } from './listParser'
import { parseHorizontalRules } from './horizontalRuleParser'
import { parseStrikethrough } from './bold italic strikethrough Parser'
import { parseBold } from './bold italic strikethrough Parser'
import { parseItalic } from './bold italic strikethrough Parser'
import { parseQuotes } from './quoteParser'
import { parseTable } from './tableParser'



export function parseMarkdown(str: string) {
  const tokens = []
  const lines = str.split('\n')
  const listParser = createListParser()

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    // 处理空行
    if (line.trim() === '') {
      tokens.push(...listParser.flush())
      i++
      continue
    }

    // 将所有内联解析函数放在一个数组中，以便可以迭代地应用它们。
const inlineParsers = [parseBold, parseItalic, parseStrikethrough];

for (let line of lines) {
  // 解析水平线等块级元素的代码...

  let inlineTokens = []; // 用于保存本行内联元素解析后的tokens

  for (let parser of inlineParsers) {
    const result = parser(line); // 对当前行应用内联解析器
    if (result.length > 0) {      // 如果解析结果不为空，则将其加入到inlineTokens中
      inlineTokens.push(...result);
    }
  }

  // 如果有任何内联标记，则添加这些标记；否则，将原始行作为普通文本处理
  if (inlineTokens.length > 0) {
    tokens.push(...inlineTokens);
  } else {
    tokens.push(new Token({ type: 'text', tag: '', nesting: 0, text: line }));
  }
}


    // 解析标题
    if (/^#+\s/.test(line)) {
      tokens.push(...listParser.flush())
      tokens.push(...parseHeadings(line))
      i++
      continue
    }

    // 尝试解析列表
    const listTokens = listParser.parseLine(line)
    if (listTokens) {
      tokens.push(...listTokens)
      i++
      continue
    }

    // 尝试解析表格
    if (line.startsWith('|')) {
      // 提取表格块
      const tableLines = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim())
        i++
      }
      const tableBlock = tableLines.join('\n')
      tokens.push(...parseTable(tableBlock)) // 调用表格解析器
      continue
    }

    // 处理段落（需要关闭列表）
    tokens.push(...listParser.flush())
    tokens.push(...parseParagraphs(line))
    i++
  }

  // 处理最后未关闭的列表
  tokens.push(...listParser.flush())

  return tokens
}
