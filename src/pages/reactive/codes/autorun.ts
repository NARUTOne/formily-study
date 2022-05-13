import { observable, autorun } from '@formily/reactive'

// 在 autorun 中用于创建持久引用数据，仅仅只会受依赖变化而重新执行 memo 内部函数
function memoCode (callback?:(res: string[]) => void) {
  const res: string[] = [];
  const obs1 = observable({
    aa: 0,
  })
  
  const dispose = autorun(() => {
    const obs2 = autorun.memo(() =>
      observable({
        bb: 0,
      })
    )
    // console.log(obs1.aa, obs2.bb++)
    // res.push(`obs1.aa: ${obs1.aa}, obs2.bb: ${obs2.bb}`)
    res.push(`obs1.aa: ${obs1.aa}, obs2.bb: ${obs2.bb++}`)
  })
  
  obs1.aa++
  obs1.aa++
  obs1.aa++
  //执行四次，输出结果为
  /**
   * 0 0
   * 1 1
   * 2 2
   * 3 3
   */
  dispose()
  callback && callback(res);
}

// 在 autorun 中用于响应 autorun 第一次执行的下一个微任务时机与响应 autorun 的 dispose
function effectCode (callback?:(res: string[]) => void, effect?:(res: string[]) => void) {
  const res: string[] = [];
  const obs1 = observable({
    aa: 0,
  })
  const dispose = autorun(() => {
    const obs2 = autorun.memo(() =>
      observable({
        bb: 0,
      })
    )
    // console.log(obs1.aa, obs2.bb++)
    // res.push(`obs1.aa: ${obs1.aa}, obs2.bb: ${obs2.bb}`)
    res.push(`obs1.aa: ${obs1.aa}, obs2.bb: ${obs2.bb++}`)
    res.push(`obs2.bb: ${obs2.bb}`)
    autorun.effect(() => {
      obs2.bb++ // 无效
      effect && effect(['effect, obs2.bb: '+ obs2.bb]) // 6
    }, [])
  })
  obs1.aa++
  obs1.aa++
  obs1.aa++
  //执行五次，输出结果为
  /**
   * 0 0
   * 1 1
   * 2 2
   * 3 3
   * 3 5
   */
  // 执行dispose, 将不会执行effect
  // dispose()
  callback && callback(res);
}

export default {
  effectCode,
  memoCode
}