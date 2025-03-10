// horizontalRuleParser.ts
import Token from '../token';

function createHrToken() {
  return new Token({
    type: 'hr',
    tag: '<hr>',
    nesting: 0,
  });
}

export function parseHorizontalRules(str: string) {
  const hrRegex = /^\s*([*-]{3,})\s*$/; // 确保至少三个连续的符号

  if (hrRegex.test(str)) {
    return [createHrToken()];
  }

  return [];
}