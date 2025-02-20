// parser.js
import Token from '../token'
import { parseHeadings } from './headingParser'
import { parseParagraphs } from './paragraphParser'
import { createListParser } from './listParser'
import { parseQuotes } from 'quoteParser.ts'
import { parseHorizontalRules } from 'horizontalRuleParser.ts'
import { parseBold } from 'bold italic 


export function parseMarkdown(str: string) {
  const tokens = []
  const lines = str.split('\n')
  const listParser = createListParser()

  lines.forEach((line) => {
    // 处理空行
    if (line.trim() === '') {
      tokens.push(...listParser.flush())
      return
    }

    // 解析标题
    if (/^#+\s/.test(line)) {
      tokens.push(...listParser.flush())
      tokens.push(...parseHeadings(line))
      return
    }

    // 尝试解析列表
    const listTokens = listParser.parseLine(line)
    if (listTokens) {
      tokens.push(...listTokens)
      return
    }

    // 处理段落（需要关闭列表）
    tokens.push(...listParser.flush())
    tokens.push(...parseParagraphs(line))
  })

  // 处理最后未关闭的列表
  tokens.push(...listParser.flush())

  return tokens
}
