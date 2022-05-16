/**
 * tracker
 * 在依赖发生变化时不会重复执行 tracker 函数，需要用户手动重复执行，只会触发 scheduler
class Tracker {
  constructor(scheduler?: (reaction: this['track']) => void, name?: string)
  track: <T>(tracker?: () => T) => T
  dispose: () => void
}
 */

import { observable, Tracker } from '@formily/reactive'

function trackerCode (callback?:(res: string[]) => void) {
  const res: string[] = []
  const obs = observable({
    aa: 11,
  })
  
  const view = () => {
    res.push(`obs.aa: ${obs.aa}`)
  }
  
  const tracker = new Tracker(() => {
    res.push('tracker scheduler')
    tracker.track(view) // 依赖变化执行
  })
  tracker.track(view) // 初始执行
  
  obs.aa = 22
  
  tracker.dispose()
  callback && callback(res)
}

export default {
  trackerCode
}
