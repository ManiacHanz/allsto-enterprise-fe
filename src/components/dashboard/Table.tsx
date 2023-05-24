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
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
    />
  )
}
