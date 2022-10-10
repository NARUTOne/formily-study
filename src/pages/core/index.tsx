import React, { useState, useCallback } from 'react';
import { Space, Select, Button, Timeline } from 'antd';
import When from '@/components/When';
import Base from './components/Base';
import formPathCode from './codes/form-path';

const { Option } = Select;

const demos: string[] = ['base'];
const codes: any = {
  ...formPathCode,
};

const CoreBox = () => {
  const [demo, setDemo] = useState('');
  const [code, setCode] = useState('');
  const [res, setRes] = useState<string[]>([]);
  const [efts, setEffect] = useState<string[]>([]);
  const codeopts = Object.keys(codes);

  function handleChange(c: string) {
    setDemo(c);
  }

  function handleChange2(c: string) {
    setCode(c);
  }

  const handleRun = useCallback(() => {
    if (codes[code]) {
      codes[code](
        (res: string[]) => {
          setRes(res);
        },
        (efs: string[]) => {
          setEffect(efs);
        },
      );
    }
  }, [code]);

  return (
    <div>
      <h3>@formily/core 示例</h3>
      <Space>
        <Select value={demo} onChange={handleChange} style={{ width: 200 }}>
          {demos.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
      </Space>
      <div className="result-box">
        <h3>{code} 示例</h3>
        <When
          conditions={[code === 'base']}
          renders={[<Base key="base" />]}
          defaultRender={<p>请选择示例</p>}
        />
      </div>
      <h3>@formily/core 代码示例</h3>
      <Space>
        <Select value={code} onChange={handleChange2} style={{ width: 200 }}>
          {codeopts.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleRun}>
          运行
        </Button>
      </Space>
      <div className="result-box">
        <h4>{code} 运行结果</h4>
        <Timeline>
          {res.map((r, i) => (
            <Timeline.Item key={i}>{r}</Timeline.Item>
          ))}
          {efts.map((r, i) => (
            <Timeline.Item color="red" key={i}>
              {r}
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default CoreBox;
