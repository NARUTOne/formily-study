import React from 'react';
import { SmileOutlined, TabletOutlined, AntDesignOutlined } from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/demo',
        name: 'demo',
        icon: <SmileOutlined />,
      },
      {
        path: '/design',
        name: 'design',
        icon: <TabletOutlined />,
      },
      {
        path: 'https://formilyjs.org/zh-CN',
        outHref: true,
        name: 'Formily 官网外链',
        icon: <AntDesignOutlined />,
      },
    ]
  },
  location: {
    pathname: '/',
  },
};
