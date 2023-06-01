import { Layout } from "@/components/layout";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  return (
    <Layout>
      <Button variant="contained">dashboard...</Button>
      <div>{router.query.id}</div>
    </Layout>
  );
};

export default Dashboard;
