import { Layout } from "@/components/layout";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="mt-2">
        <div>Edit My Org</div>
        <div></div>
      </div>
    </Layout>
  );
};

export default Dashboard;
