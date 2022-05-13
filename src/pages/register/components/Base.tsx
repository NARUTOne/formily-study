import React from 'react'
import { createForm } from '@formily/core'
import { Field, VoidField } from '@formily/react'
import {
  Form,
  FormItem,
  Input,
  Select,
  Password,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  Upload,
  FormButtonGroup,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const form = createForm({
  validateFirst: true,
})

const IDUpload = (props) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button icon={<UploadOutlined />}>上传复印件</Button>
    </Upload>
  )
}

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="新用户注册" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <Field
            name="username"
            title="用户名"
            required
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="password"
            title="密码"
            required
            decorator={[FormItem]}
            component={[
              Password,
              {
                checkStrength: true,
              },
            ]}
            reactions={(field) => {
              const confirm = field.query('.confirm_password')
              field.selfErrors =
                confirm.get('value') &&
                field.value &&
                field.value !== confirm.get('value')
                  ? '确认密码不匹配'
                  : ''
            }}
          />
          <Field
            name="confirm_password"
            title="确认密码"
            required
            decorator={[FormItem]}
            component={[
              Password,
              {
                checkStrength: true,
              },
            ]}
            reactions={(field) => {
              const password = field.query('.password')
              field.selfErrors =
                password.get('value') &&
                field.value &&
                field.value !== password.get('value')
                  ? '确认密码不匹配'
                  : ''
            }}
          />
          <VoidField
            name="name"
            title="姓名"
            decorator={[
              FormItem,
              {
                asterisk: true,
                feedbackLayout: 'none',
              },
            ]}
            component={[FormGrid]}
          >
            <Field
              name="firstName"
              decorator={[FormItem]}
              component={[
                Input,
                {
                  placeholder: '姓',
                },
              ]}
              required
            />
            <Field
              name="lastName"
              decorator={[FormItem]}
              component={[
                Input,
                {
                  placeholder: '名',
                },
              ]}
              required
            />
          </VoidField>
          <Field
            name="email"
            title="邮箱"
            required
            validator="email"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="gender"
            title="性别"
            decorator={[FormItem]}
            component={[Select]}
            dataSource={[
              {
                label: '男',
                value: 1,
              },
              {
                label: '女',
                value: 2,
              },
              {
                label: '第三性别',
                value: 3,
              },
            ]}
            required
          />
          <Field
            name="birthday"
            title="生日"
            required
            decorator={[FormItem]}
            component={[DatePicker]}
          />
          <Field
            name="address"
            title="地址"
            required
            decorator={[FormItem]}
            component={[Cascader]}
            reactions={(field) => {
              const transform = (data = {}) => {
                return Object.entries(data).reduce((buf, [key, value]) => {
                  if (typeof value === 'string')
                    return buf.concat({
                      label: value,
                      value: key,
                    })
                  const { name, code, cities, districts } = value
                  const _cities = transform(cities)
                  const _districts = transform(districts)
                  return buf.concat({
                    label: name,
                    value: code,
                    children: _cities.length
                      ? _cities
                      : _districts.length
                      ? _districts
                      : undefined,
                  })
                }, [])
              }

              field.loading = true
              fetch('//unpkg.com/china-location/dist/location.json')
                .then((res) => res.json())
                .then(
                  action.bound((data) => {
                    field.dataSource = transform(data)
                    field.loading = false
                  })
                )
            }}
          />
          <Field
            name="idCard"
            title="身份证复印件"
            required
            decorator={[FormItem]}
            component={[IDUpload]}
          />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              注册
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}