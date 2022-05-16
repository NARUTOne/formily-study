/**
 * define 手动定义领域模型，可以指定具体属性的响应式行为，也可以指定某个方法为 batch 模式
 */

import { define, observable, action, autorun } from '@formily/reactive'

function defineCode (callback?:(res: string[]) => void) {
  class DomainModel {
    deep = { aa: 1 }
    shallow = {}
    box = 0
    ref = ''
  
    constructor() {
      define(this, {
        deep: observable,
        shallow: observable.shallow,
        box: observable.box,
        ref: observable.ref,
        computed: observable.computed,
        action,
      })
    }
    // 创建一个计算缓存器
    get computed() {
      return this.deep.aa + this.box.get()
    }
    action(aa: number, bb: number) {
      this.deep.aa = aa
      this.box.set(bb)
    }
  }
  
  const res: string[] = [];
  const model = new DomainModel()
  
  autorun(() => {
    res.push(`model.computed: ${model.computed}`)
  })
  
  model.action(1, 2)
  model.action(1, 2) //重复调用不会重复响应
  model.action(3, 4)
  callback && callback(res);
}

export default {
  defineCode
}
