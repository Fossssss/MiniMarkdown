// paragraphParser.js
import Token from '../token'

export function parseParagraphs(str: string) {
  const tokens = []
  const content = str.trim()

  if (content) {
    tokens.push(
      new Token({ type: 'paragraph_open', tag: '<p>', nesting: 1 }),
      new Token({
        type: 'text',
        tag: 'None',
        nesting: 0,
        text: content,
      }),
      new Token({
        type: 'paragraph_close',
        tag: '</p>',
        nesting: -1,
      }),
    )
  }

  return tokens
}
