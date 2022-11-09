import { FormPath } from '@formily/core';

/**
 * 点路径 a.b.c
 * 用点符号来分割每个路径节点，主要用来读写数据
 */
function dotPathCode(callback?: (res: string[]) => void) {
  const target: any = {};
  const res: string[] = [];

  FormPath.setIn(target, 'a.b.c', 'value');
  res.push(FormPath.getIn(target, 'a.b.c')); //'value'
  res.push(JSON.stringify(target)); //{a:{b:{c:'value'}}}

  callback && callback(res);
}

/**
 * 下标路径
 * array.0.aa
 * 对于数组路径，都会有下标，我们的下标可以用点语法，也可以用中括号
 */
function indexPathCode(callback?: (res: string[]) => void) {
  const target = {
    array: [],
  };
  const res: string[] = [];

  FormPath.setIn(target, 'array.0.aa', '000');
  res.push(FormPath.getIn(target, 'array.0.aa')); //000
  res.push(JSON.stringify(target)); //{array:[{aa:'000'}]}
  FormPath.setIn(target, 'array[1].aa', '111');
  res.push(FormPath.getIn(target, 'array.1.aa')); //111
  res.push(JSON.stringify(target)); //{array:[{aa:'000'},{aa:'111'}]}

  callback && callback(res);
}

/**
 * 解构表达式 [aa,bb] ：类似于 ES6 的解构语法，只是它不支持...解构，在前后端数据不一致的场景非常适用
 * 1、解构表达式会作为点路径的某个节点，我们可以把它看做一个普通字符串节点，只是在数据操作时会生效，所以在匹配语法中只需要把解构表达式作为普通节点节点来匹配即可
 * 2、在 setIn 中使用解构路径，数据会被解构
 * 3、在 getIn 中使用解构路径，数据会被重组
 */
function deconstructionPathCode(callback?: (res: string[]) => void) {
  const target: any = {};
  const res: string[] = [];

  FormPath.setIn(target, 'parent.[aa,bb]', [11, 22]);
  res.push(JSON.stringify(target)); //{parent:{aa:11,bb:22}}
  res.push(FormPath.getIn(target, 'parent.[aa,bb]')); //[11,22]
  res.push(FormPath.parse('parent.[aa,bb]').toString()); //parent.[aa,bb]

  callback && callback(res);
}

/**
 * 相对路径：主要是在数据型路径头部用点语法表示，对于计算数组的相邻元素非常好用
 * 1、一个点代表当前路径
 * 2、n 个点代表往前 n-1 步
    中括号中可以用下标计算表达式：[+]代表当前下标+1，[-]代表当前下标-1，[+n]代表当前下标+n，[-n]代表当前下标-n
 * 3、路径匹配的时候不能使用分组匹配和范围匹配，比如*(..[+1].aa,..[+2].bb)这样的形式
 */
function relationPathCode(callback?: (res: string[]) => void) {
  const res: string[] = [];
  res.push(FormPath.parse('.dd', 'aa.bb.cc').toString()); //aa.bb.dd
  res.push(FormPath.parse('..[].dd', 'aa.1.cc').toString()); //aa.1.dd
  res.push(FormPath.parse('..[+].dd', 'aa.1.cc').toString()); //aa.2.dd
  res.push(FormPath.parse('..[+10].dd', 'aa.1.cc').toString()); //aa.11.dd

  callback && callback(res);
}

/**
 * 匹配路径
 * 1、* 全匹配/局部匹配
 * 2、*(pattern1,pattern2,pattern3...) 分组匹配
 * 3、*(!pattern1,pattern2,pattern3) 反向匹配
 * 4、pattern~ 扩展匹配
 * 5、*[x:y] 范围匹配，x 和 y 可以为空，代表开区间匹配
 * 6、\\或者[[]] 转义匹配关键词
 */
function matchPathCode(callback?: (res: string[]) => void) {
  const res: any[] = [];
  res.push(FormPath.parse('aa.*.cc').match('aa.bb.cc')); // true

  res.push(
    FormPath.parse('aa.*(bb,kk,dd,ee.*(oo,gg).gg).cc').match('aa.bb.cc'),
  ); // true

  res.push(FormPath.parse('*(!aa,bb,cc)').match('aa')); // false
  res.push(FormPath.parse('*(!aa,bb,cc)').match('kk')); // true

  res.push(FormPath.parse('test~').match('test_111')); // true

  res.push(FormPath.parse('aa.*[:100].bb').match('aa.3.bb')); // true
  res.push(FormPath.parse('aa.*[:100].bb').match('aa.1000.bb')); // false

  res.push(
    FormPath.parse('aa.\\,\\*\\{\\}\\.\\(\\).bb').match(
      'aa.\\,\\*\\{\\}\\.\\(\\).bb',
    ),
  ); // true
  res.push(FormPath.parse('aa.[[,*{}.()]].bb').match('aa.[[,*{}.()]].bb')); // true

  callback && callback(res.map((r) => r.toString()));
}

function testPathCode(callback?: (res: string[]) => void) {
  // const target: any = { array: [{ aa: 123, bb: 321 }] };
  const res: string[] = [];

  res.push(
    JSON.stringify(
      FormPath.parse('array.*[:].*[:].*[:].bb').match('array.0.0.0.aa'),
    ),
  );

  callback && callback(res);
}

export default {
  dotPathCode,
  indexPathCode,
  deconstructionPathCode,
  relationPathCode,
  matchPathCode,
  testPathCode,
};
