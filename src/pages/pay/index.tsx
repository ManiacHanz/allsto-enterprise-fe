import { Button } from "@mui/material"
import { useRouter } from "next/router"

export default function Pay() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen justify-between">
      <div className="flex-1 bg-white px-20 py-28 border-r">
        <div className="font-bold border-b py-[12px] mb-4 text-2xl">
          Payment
        </div>
        <fieldset className="sm:col-span-3">
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            Pay With:
          </legend>
          <div className="gap-x-3 flex py-1 mt-2">
            <div className="flex items-center gap-x-3">
              <input
                id="card"
                name="payWith"
                type="radio"
                className="h-4 w-4 border-gray-300 text-green-400 focus:ring-green-400"
              />
              <label
                htmlFor="card"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Card
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="bank"
                name="payWith"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="bank"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bank
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="crypto"
                name="payWith"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="crypto"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Crypto
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="transfer"
                name="payWith"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="transfer"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Transfer
              </label>
            </div>
          </div>
        </fieldset>
        <Button
          className="w-full bg-gradient-to-r  from-green-400 to-blue-500 mt-96 mb-5"
          variant="contained"
          onClick={() => router.push("/pay/123")}
        >
          Pay USD99.00 with AllsTo
        </Button>
        <div className="font-light text-gray-500 text-[12px] ">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </div>
      </div>
      <div className="flex-1 bg-gray-50 px-20 py-28">
        <div className="font-bold border-b py-[12px] mb-4 text-2xl">
          Order Summary
        </div>
        <div className="border-b py-[36px] mb-4 text-large flex justify-between">
          <div>Monthly Basic Subscription</div>
          <div>$99.00</div>
        </div>
        <div className="flex justify-between gap-4 my-6 pb-20 border-b">
          <input
            type="text"
            placeholder="Gift or discount code"
            className="flex-1 px-4 border rounded-md py-2"
          />
          <Button
            variant="contained"
            color="secondary"
            className="bg-indigo-700 hover:bg-indigo-500"
          >
            Apply
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div>Total</div>
          <div className="text-3xl font-bold">$99.00</div>
        </div>
      </div>
    </main>
  )
}
