import { Layout } from "@/components/layout";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { Table } from "@/components/dashboard/Table";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Dashboard = () => {
  const { query } = useRouter();

  const { data, error, isLoading } = useSwr<any>(
    query.id ? `/api/v1/links/${query.id}` : null,
    fetcher
  );

  return (
    <Layout
      addonAfter={
        <Button variant="contained" color="primary" className="h-10">
          + Create Payment Link
        </Button>
      }
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="bg-white w-3/5 mx-auto mt-10">
          <Table data={data} />
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
