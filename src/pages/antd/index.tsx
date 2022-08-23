import React, { useState } from 'react';
import { Space, Select } from 'antd';
import FormilySelect from './components/Select';
import When from '@/components/When';

const { Option } = Select;

const demos = ['select'];

const CoreBox = () => {
  const [code, setCode] = useState('');

  function handleChange(c: string) {
    setCode(c);
  }

  return (
    <div>
      <h3>@formily/antd 示例</h3>
      <Space>
        <Select value={code} onChange={handleChange} style={{ width: 200 }}>
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
          conditions={[code === 'select']}
          renders={[<FormilySelect key="select" />]}
          defaultRender={<p>请选择示例</p>}
        />
      </div>
    </div>
  );
};

export default CoreBox;
