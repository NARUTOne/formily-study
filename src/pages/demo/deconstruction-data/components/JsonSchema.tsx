import React from 'react'
import {
  Form,
  FormItem,
  DatePicker,
  FormButtonGroup,
  Radio,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    DatePicker,
    Radio,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    visible_destructor: {
      type: 'boolean',
      title: '是否显示解构字段',
      default: true,
      enum: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    undestructor: {
      type: 'string',
      title: '解构前',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
    },
    '[startDate,endDate]': {
      type: 'string',
      title: '解构后',
      default: ['2020-11-20', '2021-12-30'],
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-reactions': {
        dependencies: ['visible_destructor'],
        fulfill: {
          state: {
            visible: '{{!!$deps[0]}}',
          },
        },
      },
    },
  },
}

export default () => {
  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={schema} />
      <code>
        <pre>
          <FormConsumer>
            {(form) => JSON.stringify(form.values, null, 2)}
          </FormConsumer>
        </pre>
      </code>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </Form>
  )
}