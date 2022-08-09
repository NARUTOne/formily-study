import React, { useEffect, useState } from 'react';
import {
  FormItem,
  Input,
  ArrayCards,
  FormButtonGroup,
  Submit,
} from '@formily/antd';
import { Spin } from 'antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
  },
});

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    string_array: {
      type: 'array',
      'x-component': 'ArrayCards',
      maxItems: 3,
      'x-decorator': 'FormItem',
      'x-component-props': {
        title: '字符串数组',
      },
      items: {
        type: 'void',
        properties: {
          index: {
            type: 'void',
            'x-component': 'ArrayCards.Index',
          },
          input: {
            type: 'string',
            'x-decorator': 'FormItem',
            title: 'Input',
            required: true,
            'x-component': 'Input',
          },
          remove: {
            type: 'void',
            'x-component': 'ArrayCards.Remove',
          },
          moveUp: {
            type: 'void',
            'x-component': 'ArrayCards.MoveUp',
          },
          moveDown: {
            type: 'void',
            'x-component': 'ArrayCards.MoveDown',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayCards.Addition',
        },
      },
    },
    array: {
      type: 'array',
      'x-component': 'ArrayCards',
      maxItems: 3,
      'x-decorator': 'FormItem',
      'x-component-props': {
        title: '对象数组',
      },
      items: {
        type: 'object',
        properties: {
          index: {
            type: 'void',
            'x-component': 'ArrayCards.Index',
          },
          input: {
            type: 'string',
            'x-decorator': 'FormItem',
            title: 'Input',
            required: true,
            'x-component': 'Input',
          },
          remove: {
            type: 'void',
            'x-component': 'ArrayCards.Remove',
          },
          moveUp: {
            type: 'void',
            'x-component': 'ArrayCards.MoveUp',
          },
          moveDown: {
            type: 'void',
            'x-component': 'ArrayCards.MoveDown',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayCards.Addition',
        },
      },
    },
  },
};

export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        string_array: ['234', '4432'],
        array: [
          {
            input: '4443',
          },
          {
            input: '123',
          },
        ],
      });
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <Spin spinning={loading}>
      <FormProvider form={form}>
        <SchemaField schema={schema} />
        <FormButtonGroup>
          <Submit onSubmit={console.log}>提交</Submit>
        </FormButtonGroup>
      </FormProvider>
    </Spin>
  );
};
