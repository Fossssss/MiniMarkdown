import Token from '../token'
export function render(tokens: Token[]) {
  let html = ''

  tokens.forEach((token) => {
    if (token.type === 'text') {
      html += token.text // 直接输出文本内容
    } else {
      html += token.tag // 直接使用 token.tag
    }
  })

  return html
}
