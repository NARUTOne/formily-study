/**
 * 批量操作 batch/action
 */
import {
  observable,
  autorun,
  batch,
  action,
  untracked,
} from '@formily/reactive';

/*
 * batch 定义批量操作，内部可以收集依赖
 *
 interface batch {
    <T>(callback?: () => T): T //原地batch
    scope<T>(callback?: () => T): T //原地局部batch
    bound<T extends (...args: any[]) => any>(callback: T, context?: any): T //高阶绑定
    endpoint(callback?: () => void): void //注册批量执行结束回调
  }
*/
function batchCode(callback?: (res: string[]) => void) {
  const obs = observable({
    aa: 1,
    bb: 2,
    cc: 'c',
    dd: 'd',
  });
  const res: string[] = [];

  autorun(() => {
    res.push(`${obs.aa}, ${obs.bb}, ${obs.cc}, ${obs.dd}`);
  });

  batch(() => {
    // @ts-ignore
    batch.scope(() => {
      obs.aa = 123;
    });
    // @ts-ignore
    batch.scope(() => {
      obs.cc = 'ccccc';
    });
    obs.bb = 321;
    obs.dd = 'dddd';
  });
  callback && callback(res);
}

/**
 * action 定义一个批量动作。与 batch 的唯一差别就是 action 内部是无法收集依赖的
interface action {
  <T>(callback?: () => T): T //原地action
  scope<T>(callback?: () => T): T //原地局部action
  bound<T extends (...args: any[]) => any>(callback: T, context?: any): T //高阶绑定
}
 */
function actionCode(callback?: (res: string[]) => void) {
  const obs: any = observable({});

  const res: string[] = [];
  autorun(() => {
    res.push(`${obs.aa}, ${obs.bb}`);
  });

  // @ts-ignore
  const method = action.bound(() => {
    obs.aa = 123;
    obs.bb = 321;
  });

  method(); // 执行action
  callback && callback(res);
}

/**
 * untracked
 * 在给定的 untracker 函数内部永远不会被依赖收集
 */
function untrackedCode(callback?: (res: string[]) => void) {
  const obs = observable({
    aa: 11,
  });

  autorun(() => {
    const res = untracked(() => obs.aa);
    callback && callback([`res: ${res}`]); // 变化时不会触发
  });

  obs.aa = 22;
}

export default {
  batchCode,
  actionCode,
  untrackedCode,
};
