import React from 'react';
import Base from './components/Base';
import Reactive from './components/Reactive';
import Schema from './components/Schema';

const index = () => {
  return (
    <div>
      <h2>值受控</h2>
      <Base />
      <h2>响应式值受控</h2>
      <Reactive />
      <h2>Schema 片段联动(自定义组件)</h2>
      <Schema />
    </div>
  );
};

export default index;