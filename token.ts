export default class Token {
  type: string
  tag: string
  nesting: number
  level?: number
  text?: string
  constructor({
    type,
    tag,
    nesting,
    level,
    text,
  }: {
    type: string
    tag: string
    nesting: number
    level?: number
    text?: string
  }) {
    this.type = type
    this.tag = tag
    this.nesting = nesting
    this.level = level
    this.text = text
  }
}
