import { Layout } from "@/components/layout"
import { useRouter } from "next/router"
import { UserForm } from "@/components/dashboard/UserForm"
import useSwr from "swr"
import { Formik, FormikConfig } from "formik"
import { MyOrgFormValue } from "@/interface/dashboard"
import fetcher from "@/utils/request"

const MyEnterPrise = () => {
  const { query } = useRouter()

  const { data, error, isLoading } = useSwr<any>(
    query.id ? `profile/${query.id}` : null,
    fetcher
  )

  const submitForm: FormikConfig<MyOrgFormValue>["onSubmit"] = (
    values,
    formikHelpers
  ) => {
    return Promise.reject()
  }

  return (
    <Layout>
      <div className="mb-8 mx-auto w-3/5">
        <div className="text-lg font-bold py-2">Edit My Org</div>
        <div className="bg-white w-full">
          <Formik<MyOrgFormValue>
            enableReinitialize={true}
            initialValues={data}
            onSubmit={submitForm}
          >
            <UserForm />
          </Formik>
        </div>
      </div>
    </Layout>
  )
}

export default MyEnterPrise
