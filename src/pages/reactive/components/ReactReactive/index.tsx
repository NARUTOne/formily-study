import React from 'react'
import { Input, Row, Col } from 'antd';
import { observable } from '@formily/reactive'
import { observer, Observer } from '@formily/reactive-react'

const obs = observable({
  a: 'this is a input',
  b: 'Hello world',
})

const Demo = observer(() => {
  return (
    <div>
      <div>
        <Input
          style={{
            height: 28,
            padding: '0 8px',
            border: '2px solid #888',
            borderRadius: 3,
          }}
          value={obs.a}
          onChange={(e) => {
            obs.a = e.target.value
          }}
        />
      </div>
      <div>{obs.a}</div>
    </div>
  )
})

const DemoObserver = () => {
  return (
    <div>
      <div>
        <Observer>
          {() => (  
            <Input
              style={{
                height: 28,
                padding: '0 8px',
                border: '2px solid #888',
                borderRadius: 3,
              }}
              value={obs.b}
              onChange={(e) => {
                obs.b = e.target.value
              }}
            />
          )}
        </Observer>
      </div>
      <div>{obs.b}</div>
      <Observer>{() => <div>监听变化：{obs.b}</div>}</Observer>
    </div>
  )
}

export default observer(() => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}><Demo /></Col>
        <Col span={12}><DemoObserver /></Col>
      </Row>
    </div>
  )
})