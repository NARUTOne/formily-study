import React, { useState, useCallback } from 'react';
import { Space, Button, Select, Timeline } from 'antd';
import autorunCodes from './components/codes/autorun';
import reactionCodes from './components/codes/reaction';
import batchActionCodes from './components/codes/batch-action';
import defineCodes from './components/codes/define';
import modelCodes from './components/codes/model';
import observeCodes from './components/codes/observe';
import markrawCodes from './components/codes/markraw';
import markobservableCodes from './components/codes/markobservable';
import trackerCodes from './components/codes/tracker';
import ReactReactive from './components/ReactReactive';

const { Option } = Select;

const codes: any = {
  ...autorunCodes,
  ...reactionCodes,
  ...batchActionCodes,
  ...defineCodes,
  ...modelCodes,
  ...observeCodes,
  ...markrawCodes,
  ...markobservableCodes,
  ...trackerCodes
}

const ReactiveDemo = () => {
  const [code, setCode] = useState('');
  const [res, setRes] = useState<string[]>([]);
  const [efts, setEffect] = useState<string[]>([]);

  function handleChange (c: string) {
    setCode(c);
  }

  const handleRun = useCallback(() => {
    if (codes[code]) {
      codes[code]((res: string[]) => {
        setRes(res)
      }, (efs: string[]) => {
        setEffect(efs);
      });
    }
  }, [code]);

  const codeopts = Object.keys(codes);
  return (
    <div>
      <h3>@formily/reactive 代码示例</h3>
      <Space>
        <Select value={code} onChange={handleChange} style={{width: 200}}>
          {codeopts.map(c => <Option key={c} value={c}>{c}</Option>)}
        </Select>
        <Button type='primary' onClick={handleRun}>运行</Button>
      </Space>
      <div className='result-box'>
        <h4>{code} 运行结果</h4>
        <Timeline>
          {res.map((r, i) => <Timeline.Item key={i}>{r}</Timeline.Item>)}
          {efts.map((r, i) => <Timeline.Item color='red' key={i}>{r}</Timeline.Item>)}
        </Timeline>
      </div>
      <h3>@formily/reactive-react 示例</h3>
      <ReactReactive />
    </div>
  );
};

export default ReactiveDemo;