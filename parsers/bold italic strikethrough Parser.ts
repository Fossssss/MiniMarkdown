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

// 粗体解析(更改后的代码) 分别解释**和{{}}

export function parseBold(str: string){
  const tokens = [];
  // 匹配 ** 包裹的内容
  const doubleAsteriskRegex = /(\*\*)(.*?)\1/g;
  // 匹配 {{ }} 包裹的内容
  const doubleBraceRegex = /\{\{(.*?)\}\}/g;
  let match;

  // 处理 ** 包裹的内容
  while ((match = doubleAsteriskRegex.exec(str)) !== null){
    const content = match[2];
    tokens.push(
      createInlineToken('bold_open','strong_open'),
      new Token({ type: 'text', tag: '', nesting: 0, text:content}),
      createInlineToken('bold_close','strong_close'),
    );
  }

  // 处理 {{ }} 包裹的粗体文本
  while ((match = doubleBraceRegex.exec(str)) !== null) {
    const content = match[1];
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
  const italicRegex = /(\*|_)(.*?)\1/g;//确保*或者_成对出现
  let match;
  
  while ((match = italicRegex.exec(str)) !== null) {
    const content = match[2];
    tokens.push(
      createInlineToken('italic_open', 'em_open'),
      new Token({ type: 'text', tag: '', nesting: 0, text: content }),
      createInlineToken('italic_close', 'em_close'),
    );
  }
  
  return tokens;
}

// 删除线解析
export function parseStrikethrough(str: string) {
  if (typeof str!= 'string'){
    console.error('输入必须是字符串');
    return [];
  }
  const tokens = [];
  const strikeRegex = /(\~{2,})(.*?)\1/g; 
  //匹配两个或者更多连续的破浪线的内容
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
