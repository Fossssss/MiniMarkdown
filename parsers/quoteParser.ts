import Token from '../token';

function createBlockquoteToken(type: string) {
  const tag =
    type === 'blockquote_open'
      ? '<blockquote>'
      : type === 'blockquote_close'
      ? '</blockquote>'
      : 'None';
  
  return new Token({
    type: type,
    tag: tag,
    nesting: type === 'blockquote_open' ? 1 : -1,
  });
}

export function parseQuotes(str: string) {
  const tokens: Token[] = [];
  // 修正正则表达式，匹配一个或者多个 > 符号
  const quoteRegex = /(>+)\s*(.*)/g; 

  let match;
  while ((match = quoteRegex.exec(str)) !== null) {
    const level = match[1].length; // 数量表示层级
    const content = match[2].trim();

    // 生成嵌套的开标签
    for (let i = 0; i < level; i++) {
      tokens.push(createBlockquoteToken('blockquote_open'));
    }

    tokens.push(
      new Token({ type: 'text', tag: '', nesting: 0, text: content })
    );

    // 生成对应的闭标签
    for (let i = 0; i < level; i++) {
      tokens.push(createBlockquoteToken('blockquote_close'));
    }
  }

  return tokens;
}
