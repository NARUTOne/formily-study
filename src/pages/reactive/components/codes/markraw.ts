/**
 * markRaw 
 * 标记任意一个对象或者类原型为永远不可被 observable 劫持，优先级比 markObservable 高
注意：如果对一个已经是 observable 的对象标记 markRaw，那么 toJS，是不会将它转换成普通对象的
 */

import { observable, autorun, markRaw } from '@formily/reactive'

function markRawCode (callback?:(res: string[]) => void) {
  const res: string[] = [];
  class A {
    property = 0
  }
  
  const a = observable(new A())
  
  autorun(() => {
    res.push(`a.property: ${a.property}`) //property变化时会被触发，因为A实例是普通对象
  })
  
  a.property = 123
  
  //--------------------------------------------
  
  const b = observable(markRaw(new A())) //实例级标记，只对当前实例生效
  
  autorun(() => {
    res.push(`b.property: ${b.property}`) // property变化时不会被触发，因为已被标记raw
  })
  
  b.property = 123

  //--------------------------------------------
  
  const d = markRaw(observable(new A())) //实例级标记，只对当前实例生效
  
  autorun(() => {
    res.push(`d.property: ${d.property}`) // property变化时不会被触发，因为已被标记raw
  })
  
  d.property = 123
  
  //--------------------------------------------
  
  markRaw(A) // 类级标记，那么所有实例都会生效
  
  const c = observable(new A()) // 被标记了，则不能再被劫持
  
  autorun(() => {
    res.push(`c.property: ${c.property}`) //property变化时不会被触发，因为已被标记raw
  })
  
  c.property = 123

  callback && callback(res)
}

export default {
  markRawCode
}