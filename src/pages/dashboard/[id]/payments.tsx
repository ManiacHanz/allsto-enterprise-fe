import { Table } from "@/components/dashboard/Table"
import { Layout } from "@/components/layout"
import fetcher from "@/utils/request"
import { Button, CircularProgress } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import { useRouter } from "next/router"
import useSwr from "swr"

const statusMap = ["Unpaid", "Waiting To Sent", "Paid"]

const renderStatus = (num: number) => {
  return statusMap[num] ?? ""
}

const Dashboard = () => {
  const {
    query: { id },
  } = useRouter()

  const { data, error, isLoading } = useSwr<any>(
    id ? `pay/${id}` : null,
    fetcher
  )

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "INVOICE ID",
      width: 300,
      sortable: false,
    },
    {
      field: "amount",
      headerName: "BILL AMOUNT",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        console.log(params)
        return (
          <div>
            <div>{params.value}</div>
          </div>
        )
      },
    },
    {
      field: "name",
      headerName: "CLIENT",
      width: 150,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "BILL TIME",
      width: 200,
      sortable: false,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <div>{renderStatus(params.row.status)}</div>
          </div>
        )
      },
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
    <Layout>
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
