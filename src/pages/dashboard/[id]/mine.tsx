import { Layout } from "@/components/layout";
import { useRouter } from "next/router";
import { UserForm } from "@/components/dashboard/UserForm";
import useSwr from "swr";
import { Formik, FormikConfig } from "formik";
import { MyOrgFormValue } from "@/interface/dashboard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MyEnterPrise = () => {
  const { query } = useRouter();

  const { data, error, isLoading } = useSwr<any>(
    query.id ? `/api/v1/user/${query.id}` : null,
    fetcher
  );

  console.log("mine: ", data, isLoading);

  const submitForm: FormikConfig<MyOrgFormValue>["onSubmit"] = (
    values,
    formikHelpers
  ) => {
    console.log(20, values, formikHelpers);
    return Promise.reject();
  };

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
  );
};

export default MyEnterPrise;
