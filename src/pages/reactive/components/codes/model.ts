/**
 * model 快速定义领域模型
getter/setter 属性自动声明 computed
函数自动声明 action
普通属性自动声明 observable
 */

import { model, autorun, observable, raw, toJS, markRaw } from '@formily/reactive';

function modelCode (callback?:(res: string[]) => void) {
  const res: string[] = [];
  const obs = model({
    aa: 1,
    bb: 2,
    get cc() {
      return this.aa + this.bb
    },
    update(aa: number, bb: number) {
      this.aa = aa;
      this.bb = bb;
      res.push(`update: ${this.cc}`);
    },
  })
  
  autorun(() => {
    res.push(`res: ${obs.cc}`);
  })
  
  obs.aa = 3
  obs.update(4, 6)

  // 获取源数据
  const obs2: any = observable({})
  obs2.aa = { bb: 123 }
  console.log(raw(obs2))
  console.log(raw(obs2.aa))

  // toJS
  const obs3 = observable({
    aa: {
      bb: {
        cc: 123,
      },
    },
  })
  // const obs4 = markRaw(obs3); // 已经是 observable 的对象标记 markRaw，那么 toJS，是不会将它转换成普通对象的
  const js = toJS(obs3)
  autorun(() => {
    console.log(js.aa.bb.cc) //变化时不会触发
  })
  js.aa.bb.cc = 321


  callback && callback(res);
}

export default {
  modelCode
}
