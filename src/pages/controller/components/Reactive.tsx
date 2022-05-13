import React, { useMemo, useRef } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const MyForm = (props) => {
  const count = useRef(1)
  const form = useMemo(
    () =>
      createForm({
        values: props.values,
      }),
    []
  )

  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{ placeholder: '受控者' }}
        />
      </SchemaField>
      Form组件渲染次数：{count.current++}
    </Form>
  )
}

const Controller = observer((props) => {
  const count = useRef(1)
  return (
    <FormItem>
      <Input
        value={props.values.input}
        placeholder="控制者"
        onChange={(event) => {
          // 直接修改，监听变化
          props.values.input = event.target.value
        }}
      />
      Controller组件渲染次数：{count.current++}
    </FormItem>
  )
})

export default () => {
  const count = useRef(1)
  const values = useMemo(() =>
    observable({
      input: '',
    })
  )
  return (
    <>
      <Controller values={values} />
      <MyForm values={values} />
      根组件渲染次数：{count.current++}
    </>
  )
}