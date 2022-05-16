/**
 * reaction
 * 接收一个 tracker 函数，与 callback 响应函数，如果 tracker 内部有消费 observable 数据，
 * 数据发生变化时，tracker 函数会重复执行，但是 callback 执行必须要求 tracker 函数返回值发生变化时才执行
 */
import { observable, reaction, batch } from '@formily/reactive';

function reactionBaseCode (callback?:(res: string[]) => void) {
  const res: string[] = [];
  const obs = observable({
    aa: 1,
    bb: 2,
  })
  
  const dispose = reaction(() => {
    const adres = obs.aa + obs.bb
    res.push(`tracker res: ${adres}`)
    return adres;
  }, (ares: any, odres: any) => {
    res.push(`callback res: ${ares}, old: ${odres}`)
  })
  
  batch(() => {
    //不会触发，因为obs.aa + obs.bb值没变
    obs.aa = 2
    obs.bb = 1
  })
  
  obs.aa = 4
  
  dispose()
  callback && callback(res);
}

export default {
  reactionBaseCode
}