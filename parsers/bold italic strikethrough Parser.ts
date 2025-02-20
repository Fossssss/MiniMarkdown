// inlineParser.js
import Token from '../token';

function createInlineToken(type: string, tag: string) {
  return new Token({
    type,
    tag,
    nesting: type === 'bold_open' || type === 'italic_open' || type === 'strikethrough_open' ? 1 :
            type === 'bold_close' || type === 'italic_close' || type === 'strikethrough_close' ? -1 : 0,
  });
}

// 粗体解析
export function parseBold(str: string) {
  const tokens = [];
  const boldRegex = /(\*\*|\*\*|\*\*)(.*?)\2|\{\{.*?\}\}/g; // 示例扩展正则表达式
  let match;
  
  while ((match = boldRegex.exec(str)) !== null) {
    const content = match[2];
    tokens.push(
      createInlineToken('bold_open', 'strong'),
      new Token({ type: 'text', tag: '', nesting: 0, text: content }),
      createInlineToken('bold_close', 'strong'),
    );
  }
  
  return tokens;
}

// 斜体解析
export function parseItalic(str: string) {
  const tokens = [];
  const italicRegex = /(\*|_)([^\\*]*)(?=\*|\_|$)/g; // 示例扩展正则表达式
  let match;
  
  while ((match = italicRegex.exec(str)) !== null) {
    const content = match[2];
    tokens.push(
      createInlineToken('italic_open', 'em'),
      new Token({ type: 'text', tag: '', nesting: 0, text: content }),
      createInlineToken('italic_close', 'em'),
    );
  }
  
  return tokens;
}

// 删除线解析
export function parseStrikethrough(str: string) {
  const tokens = [];
  const strikeRegex = /(\~{2,})(.*?)\1/g; // 示例扩展正则表达式
  let match;
  
  while ((match = strikeRegex.exec(str)) !== null) {
    const content = match[2];
    tokens.push(
      createInlineToken('strikethrough_open', 'del'),
      new Token({ type: 'text', tag: '', nesting: 0, text: content }),
      createInlineToken('strikethrough_close', 'del'),
    );
  }
  
  return tokens;
}