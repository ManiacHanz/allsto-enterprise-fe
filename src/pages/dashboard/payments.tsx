import { Table } from "@/components/dashboard/Table"
import { Layout } from "@/components/layout"
import { numToUSD } from "@/utils/common"
import fetcher from "@/utils/request"
import { Button, Chip, CircularProgress } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import dayjs from "dayjs"
import useSwr from "swr"

const statusMap = [
  ["Unpaid", "primary"],
  ["Waiting To Sent", "secondary"],
  ["Paid", "info"],
]

const renderStatus = (num: number) => {
  const [label, color] = statusMap[num] ?? ["", "primary"]
  // @ts-ignore
  // TODO: remove this ignore
  return label ? <Chip size="small" label={label} color={color} /> : ""
}

const Dashboard = () => {
  const { data, error, isLoading } = useSwr<any>(`pay`, fetcher)

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "INVOICE ID",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <div>{params.value}</div>
            <div className="text-gray-400 text-xs">{params.row.website}</div>
          </div>
        )
      },
    },
    {
      field: "amount",
      headerName: "BILL AMOUNT",
      width: 180,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <div>{numToUSD(params.value)}</div>
            <div className="text-gray-400 text-xs">{params.row.item}</div>
          </div>
        )
      },
    },
    {
      field: "name",
      headerName: "CLIENT",
      width: 170,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <div>{params.value}</div>
            <div className="text-gray-400 text-xs">{params.row.email}</div>
          </div>
        )
      },
    },
    {
      field: "createdAt",
      headerName: "BILL TIME",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        if (!params.value) return ""
        return dayjs(params.value).format("YYYY/MM/DD HH:mm:ss")
      },
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
            {params.row.status === 0 && (
              <Button disableRipple>Download Receipt</Button>
            )}
            {params.row.status === 1 && (
              <>
                <Button disableRipple>Edit</Button>
                <Button disableRipple>Share Link</Button>
              </>
            )}
            {params.row.status === 2 && (
              <>
                <Button disableRipple>View</Button>
                <Button disableRipple>Notify</Button>
              </>
            )}
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
