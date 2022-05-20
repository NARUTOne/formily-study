import React, { useState } from 'react';
import { Space, Select } from 'antd';
import Base from './components/Base';
import When from '@/components/When';

const { Option } = Select;

const demos = [
  'base'
];

const CoreBox = () => {
  const [code, setCode] = useState('');

  function handleChange (c: string) {
    setCode(c);
  }

  return (
    <div>
      <h3>@formily/core 示例</h3>
      <Space>
        <Select value={code} onChange={handleChange} style={{width: 200}}>
          {demos.map(c => <Option key={c} value={c}>{c}</Option>)}
        </Select>
      </Space>
      <div className='result-box'>
        <h3>{code} 示例</h3>
        <When 
          conditions={[
            code === 'base',
          ]}
          renders={[
            <Base key="base"/>
          ]}
          defaultRender={<p>请选择示例</p>}
        />
      </div>
    </div>
  );
};

export default CoreBox;
