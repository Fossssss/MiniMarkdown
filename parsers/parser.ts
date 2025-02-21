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

export function parseMarkdown(str: string) {
  const tokens = [];
  const lines = str.split('\n');
  const listParser = createListParser();

  lines.forEach((line) => {
    // 处理空行
    if (line.trim() === '') {
      tokens.push(...listParser.flush());
      return;
    }

    // 解析水平线
    const hrTokens = parseHorizontalRules(line);
    if (hrTokens.length > 0) {
      tokens.push(...listParser.flush());
      tokens.push(...hrTokens);
      return;
    }

    // 解析标题
    if (/^#+\s/.test(line)) {
      tokens.push(...listParser.flush());
      const headingTokens = parseHeadings(line);
      tokens.push(...headingTokens);
      return;
    }

    // 尝试解析列表
    const listTokens = listParser.parseLine(line);
    if (listTokens) {
      tokens.push(...listTokens);
      return;
    }

    // 处理段落，并在此处添加粗体、斜体和删除线的解析以及引用
    const paragraphTokens = parseParagraphs(line);

    // 调用引用解析器
    const quoteTokens = parseQuotes(line);

    tokens.push(...listParser.flush());
    tokens.push(...paragraphTokens);
    tokens.push(...quoteTokens);

    // 解析格式（粗体、斜体、删除线）
    const boldTokens = parseBold(line);
    const italicTokens = parseItalic(line);
    const strikeTokens = parseStrikethrough(line);

    tokens.push(...boldTokens);
    tokens.push(...italicTokens);
    tokens.push(...strikeTokens);

  });

  // 处理最后未关闭的列表
  tokens.push(...listParser.flush());

  return tokens;
}
