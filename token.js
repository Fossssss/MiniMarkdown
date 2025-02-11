export default function Token({
  type,
  tag,
  nesting,
  level = 0,
  text = '',
} = {}) {
  this.type = type //Token类型 例如:text,heading_open,heading_close
  this.tag = tag //Token标签 例如:<h1>,</h1>
  this.nesting = nesting //标记标签层级,1为开标签，-1为闭标签，0为自闭合标签与文本
  this.level = level //标题&列表层级，根表层级为0，嵌套表逐级递增
  this.text = text //文本
}
