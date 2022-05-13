import React from 'react';
import { IRouteComponentProps, Link } from 'umi'
import { Space } from 'antd';
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
        menuItemRender={(itemProps) => itemProps.outHref ? 
          <Space>
            <span>{itemProps.icon}</span>
            <span>{itemProps.name}</span>
          </Space> : 
          <Space>
            <span>{itemProps.icon}</span>
            <Link className='dark-nav-link' to={itemProps.path}>{itemProps.name}</Link>
          </Space>
        }
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