import React, { createContext, useMemo, useContext, useEffect } from 'react'
import { createForm, setValidateLanguage } from '@formily/core'
import { observer } from '@formily/reactive-react'

//创建上下文，方便Field消费
const FormContext = createContext(null)
//创建上下文，方便FormItem消费
const FieldContext = createContext(null)

//状态桥接器组件
const Field = observer((props: any) => {
  const form: any = useContext(FormContext)
  console.log('form', form)
  //创建字段
  const field = form ? form.createField(props) : null;
  useEffect(() => {
    //挂载字段
    field.onMount()
    return () => {
      //卸载字段
      field.onUnmount()
    }
  })
  // 显隐
  if (!field.visible || field.hidden) return null
  //渲染字段，将字段状态与UI组件关联
  const component = React.createElement(field.component[0], {
    ...field.component[1],
    value: field.value,
    onChange: field.onInput,
  })

  //渲染字段包装器
  const decorator = React.createElement(
    field.decorator[0],
    field.decorator[1],
    component
  )

  return (
    <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>
  )
})

// FormItem UI组件
const FormItem = observer(({ children }) => {
  const field: any = useContext(FieldContext) || {};
  return (
    <div>
      <div style={{ height: 20 }}>{field.title}:</div>
      {children}
      <div style={{ height: 20, fontSize: 12, color: 'red' }}>
        {field.selfErrors.join(',')}
      </div>
    </div>
  )
})

// Input UI组件
const Input = (props: any) => {
  return (
    <input
      {...props}
      value={props.value || ''}
      style={{
        ...props.style,
        border: '2px solid rgb(186 203 255)',
        borderRadius: 6,
        width: '100%',
        height: 28,
        padding: '0 5px',
      }}
    />
  )
}

//表单管理入口
const FormProvider: React.FC<any> = (props) => {
  useEffect(() => {
    //挂载表单
    props.form?.onMount()
    return () => {
      //卸载表单
      props.form?.onUnmount()
    }
  })
  return (
    <FormContext.Provider value={props.form}>
      {props.children}
    </FormContext.Provider>
  )
}

//表单响应式监控器
const FormConsumer: React.FC<any> = observer((props) => {
  const form = useContext(FormContext)
  return <div>{props.children(form)}</div>
})

/*
 * 以上逻辑都已经在 @formily/react 或 @formily/vue 中实现，实际使用无需重复编写
 */

//切换内置校验国际化文案为中文
setValidateLanguage('zh')

export default () => {
  const form = useMemo(() => createForm({ validateFirst: true, disabled: true }), [])

  const createPasswordEqualValidate = (equalName: string) => (field: any) => {
    if (
      form.values.confirm_password &&
      field.value &&
      form.values[equalName] !== field.value
    ) {
      field.selfErrors = ['Password does not match Confirm Password.']
    } else {
      field.selfErrors = []
    }
  }

  return (
    <FormProvider form={form}>
      <h4>模拟实现一个表单控制</h4>
      <Field
        name="name"
        title="Name"
        required
        decorator={[FormItem]}
        component={[Input, { placeholder: 'Please Input' }]}
      />
      <Field
        name="password"
        title="Password"
        required
        decorator={[FormItem]}
        component={[Input, { type: 'password', placeholder: 'Please Input' }]}
        reactions={createPasswordEqualValidate('confirm_password')}
      />
      <Field
        name="confirm_password"
        title="Confirm Password"
        required
        decorator={[FormItem]}
        component={[Input, { type: 'password', placeholder: 'Please Input' }]}
        reactions={createPasswordEqualValidate('password')}
      />
      <code>
        <pre>
          <FormConsumer>
            {(form: any) => JSON.stringify(form.values, null, 2)}
          </FormConsumer>
        </pre>
      </code>
    </FormProvider>
  )
}