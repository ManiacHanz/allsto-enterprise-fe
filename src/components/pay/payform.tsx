import { Button, Form, Input, Radio, Select } from "antd"
import { FC } from "react"

export type Values = {
  name: string
  amount: string
  remark?: string
  email: string
  receiveBy: string
  payWith: "USDC" | "USDT" | "BUSD"
}

type Props = {
  onSubmit: (values: Values) => void
}

const { Option } = Select

export const PayForm: FC<Props> = ({ onSubmit }) => {
  const [form] = Form.useForm<Values>()

  const onFinish = (values: Values) => {
    onSubmit(values)
  }

  return (
    <Form<Values>
      layout="vertical"
      form={form}
      initialValues={{}}
      onFinish={onFinish}
    >
      <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Remark" name="remark">
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Email for Receipt"
        name="email"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email for Receipt"
        name="receiveBy"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="Polygon">Polygon</Option>
          <Option value="Ethereum">Ethereum</Option>
          <Option value="Arbitrum">Arbitrum</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Pay with" name="payWith" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="USDC">USDC</Radio>
          <Radio value="USDT">USDT</Radio>
          <Radio value="BUSD">BUSD</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          className="w-full bg-purple-700 hover:bg-purple-500"
          color="main"
          htmlType="submit"
        >
          Pay
        </Button>
      </Form.Item>
    </Form>
  )
}
