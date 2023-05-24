import { Layout } from "@/components/layout"
import { Button, CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import { Table } from "@/components/dashboard/Table"
import useSwr from "swr"
import fetcher from "@/utils/request"
import { GridColDef } from "@mui/x-data-grid"

const Dashboard = () => {
  const { query } = useRouter()

  const { data, error, isLoading } = useSwr<any>(
    query.id ? `links/${query.id}` : null,
    fetcher
  )

  const columns: GridColDef[] = [
    {
      field: "link",
      headerName: "PAYMENT LINK",
      width: 300,
      sortable: false,
    },
    {
      field: "price",
      headerName: "PRICE & ITEM",
      width: 260,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <div>{params.value}</div>
            <div>{params.row.item ?? "-"}</div>
          </div>
        )
      },
    },
    {
      field: "createdAt",
      headerName: "CREATED TIME",
      width: 150,
      sortable: false,
    },
    {
      field: "operation",
      headerName: " ",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button>Edit</Button>
            <Button>Share Link</Button>
          </>
        )
      },
    },
  ]

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
          <Table data={data} columns={columns} />
        </div>
      )}
    </Layout>
  )
}

export default Dashboard
