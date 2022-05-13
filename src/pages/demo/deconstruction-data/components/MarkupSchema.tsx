import React from 'react'
import {
  Form,
  FormItem,
  DatePicker,
  FormButtonGroup,
  Radio,
  Submit,
} from '@formily/antd'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    DatePicker,
    Radio,
  },
})

const form = createForm({
  effects() {
    onFieldValueChange('visible_destructor', (field) => {
      form.setFieldState('[startDate,endDate]', (state) => {
        state.visible = !!field.value
      })
    })
  },
})

export default () => {
  return (
    <Form form={form} layout="vertical">
      <SchemaField>
        <SchemaField.Boolean
          name="visible_destructor"
          title="是否显示解构字段"
          default={true}
          enum={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
          x-decorator="FormItem"
          x-component="Radio.Group"
        />
        <SchemaField.String
          name="undestructor"
          title="解构前"
          x-decorator="FormItem"
          x-component="DatePicker.RangePicker"
        />
        <SchemaField.String
          name="[startDate,endDate]"
          title="解构后"
          default={['2020-11-20', '2021-12-30']}
          x-decorator="FormItem"
          x-component="DatePicker.RangePicker"
        />
      </SchemaField>
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