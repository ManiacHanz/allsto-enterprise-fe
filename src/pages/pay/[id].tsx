import { PayForm, Values } from "@/components/pay/payform"
import { Button } from "@mui/material"
import fetcher from "@/utils/request"
import { useRouter } from "next/router"
import { message } from "antd"

export default function PayTo() {
  const { query } = useRouter()
  const { id } = query

  const onSubmit = async (values: Values) => {
    const result = await fetcher.post(`pay/${id}`, values)
    message.success("pay successfully")
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between">
        <div>LOGO</div>
        <Button variant="outlined">Connect Wallet</Button>
      </header>
      <main className="mx-auto my-6 w-4/5 bg-white rounded-xl flex shadow-md p-6 max-w-[1000px]">
        <div className="flex-1 flex flex-col justify-center items-center ">
          <div className="text-3xl mb-3 font-bold">PAY TO</div>
          <div className="text-2xl">Web3 Saas Inc.</div>
        </div>
        <div className="flex-1 border rounded-2xl ">
          <div className="p-8">
            <PayForm onSubmit={onSubmit} />
          </div>
        </div>
      </main>
    </div>
  )
}
