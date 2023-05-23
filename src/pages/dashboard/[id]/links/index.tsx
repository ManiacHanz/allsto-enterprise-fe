import { Layout } from "@/components/layout";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { Table } from "./components/Table";

const Dashboard = () => {
  const router = useRouter();
  return (
    <Layout
      addonAfter={
        <Button variant="contained" className="h-10">
          + Create Payment Link
        </Button>
      }
    >
      <div className="bg-white w-3/5 mx-auto mt-10">
        <Table />
      </div>
    </Layout>
  );
};

export default Dashboard;
