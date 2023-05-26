import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { FC } from "react"

type Props = {
  columns?: GridColDef[]
  data?: { data: []; total: number }
}

export const Table: FC<Props> = ({ data, columns = [] }) => {
  return (
    <DataGrid
      getRowId={(row) => row["_id"]}
      rows={data?.data ?? []}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 20,
          },
        },
      }}
      onPaginationModelChange={console.log}
      pageSizeOptions={[20, 30, 50, 100]}
      disableRowSelectionOnClick
    />
  )
}
