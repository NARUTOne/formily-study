import React, { useState, useCallback } from 'react';
import { Space, Button, Select, Timeline } from 'antd';
import autorunCodes from './codes/autorun';

const { Option } = Select;

const codes: any = {
  ...autorunCodes
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
        <h3>{code} 运行结果</h3>
        <Timeline>
          {res.map((r, i) => <Timeline.Item key={i}>{r}</Timeline.Item>)}
          {efts.map((r, i) => <Timeline.Item color='red' key={i}>{r}</Timeline.Item>)}
        </Timeline>
      </div>
    </div>
  );
};

export default ReactiveDemo;