// parser.js
import Token from '../token'
import { parseHeadings } from './headingParser'
import { parseParagraphs } from './paragraphParser'
import { createListParser } from './listParser'
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
