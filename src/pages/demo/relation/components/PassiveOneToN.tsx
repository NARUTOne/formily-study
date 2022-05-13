import React from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldReact('*(input1,input2)', (field) => {
      field.display = field.query('select').value()
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="受控者"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="受控者"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)