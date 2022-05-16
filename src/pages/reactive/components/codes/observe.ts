/**
 * observe 会监听 observable 对象的所有操作，支持深度监听也支持浅监听
 * 读取操作是不会被监听到的
 */
 import { observable, observe } from '@formily/reactive'

function observeCode (callback?:(res: string[]) => void) {
  const res: string[] = [];
  const obs = observable({
    aa: 11,
  })
  
  const dispose = observe(obs, (change) => {
    res.push(`change: ${JSON.stringify(change)}`)
  })
  
  obs.aa = 22
  
  dispose()
  callback && callback(res);
}

export default {
  observeCode
}
