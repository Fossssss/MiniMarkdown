// headingParser.js
import Token from '../token'

function createHeadingToken(type: string, level: number) {
  // 判断开标签还是闭标签来决定 tag
  const tag =
    type === 'heading_open'
      ? `<h${level}>`
      : type === 'heading_close'
      ? `</h${level}>`
      : 'None'

  return new Token({
    type: type,
    tag: tag, // 根据 type 确定 tag
    nesting: type === 'heading_open' ? 1 : type === 'heading_close' ? -1 : 0,
    level: level,
  })
}

export function parseHeadings(str: string) {
  const tokens = []
  const headingRegex = /^(#+)\s*(.*)/ // 正则表达式

  const match = headingRegex.exec(str)
  if (!match) return []

  const level = match[1].length
  const content = match[2]

  tokens.push(
    createHeadingToken('heading_open', level),
    new Token({ type: 'text', tag: '', nesting: 0, text: content }),
    createHeadingToken('heading_close', level),
  )

  return tokens
}
