/**
 * markobservable 
 * 标记任意一个对象或者类原型为可被 observable 劫持，在@formily/reactive 中会自动绕过 React Node 与带有 toJSON/toJS 方法的对象，
 * 特殊场景，我们可能希望该对象应该被劫持，所以可以使用 markObservable 标记
 */
import { observable, autorun, markObservable } from '@formily/reactive'

function markObservableCode (callback?:(res: string[]) => void) {
  const res: string[] = [];
  class A {
    property = 0
  
    toJSON() {}
  }
  
  const a = observable(new A())
  
  autorun(() => {
    res.push(`a.property: ${a.property}`) //property变化时不会被触发，因为A实例中有toJSON方法
  })
  
  a.property = 123
  
  //--------------------------------------------
  
  const b = observable(markObservable(new A())) //实例级标记，只对当前实例生效
  
  autorun(() => {
    res.push(`b.property: ${b.property}`) //property变化时可以被触发，因为已被标记observable
  })
  
  b.property = 123
  
  //--------------------------------------------
  
  markObservable(A) //类级标记，那么所有实例都会生效
  
  const c = observable(new A())
  
  autorun(() => {
    res.push(`c.property: ${c.property}`) //property变化时可以被触发，因为已被标记observable
  })
  
  c.property = 123

  callback && callback(res);
}

export default {
  markObservableCode
}