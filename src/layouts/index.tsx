import React from 'react';
import { IRouteComponentProps, Link } from 'umi'
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import defprops from './defprops';
import './index.less';

const Layouts = (props: IRouteComponentProps) => {
  return (
    <div className='layouts'>
      <ProLayout {...defprops} title="Formily" 
        menuHeaderRender={(logo, title) => (<div onClick={() => props.history.push('/')}>
        <span style={{verticalAlign: 'middle'}}>{logo}</span>
        {title}
        </div>
        )}
        menuItemRender={(itemProps) => itemProps.outHref ? itemProps.name : <Link to={itemProps.path}>{itemProps.name}</Link>}
      >
        <PageContainer content={<div>
          <h3>Formily</h3>
          <p>抽象表单领域模型的 MVVM 表单解决方案</p>
        </div>}>
          {props.children}
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default Layouts;