import React from 'react';
import { IRouteComponentProps } from 'umi'
import { Link } from 'umi';

const Demo = (props: IRouteComponentProps) => {
  return (
    <div>
      <Link to='/demo/base'>base demo</Link><br/>
      <Link to='/demo/login'>login demo</Link><br/>
      <Link to='/demo/register'>register demo</Link><br/>
      <Link to='/demo/detail'>detail demo</Link><br/>
      <Link to='/demo/controller'>controller demo</Link><br/>
      <Link to='/demo/calc-relation'>联动计算</Link><br/>
      <Link to='/demo/deconstruction-data'>数据解构</Link><br/>
      <div>
        {props.children}
      </div>
    </div>
  );
};

export default Demo;