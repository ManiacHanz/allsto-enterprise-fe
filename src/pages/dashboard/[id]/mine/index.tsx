import { Layout } from "@/components/layout";
import { useRouter } from "next/router";
import { Form } from "./components/Form";

const Dashboard = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="mb-8 mx-auto w-3/5">
        <div className="text-lg font-bold py-2">Edit My Org</div>
        <div className="bg-white w-full">
          <Form />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
