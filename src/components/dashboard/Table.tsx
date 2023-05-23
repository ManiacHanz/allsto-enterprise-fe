import { numToUSD, setPrecision } from "@/utils/common";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";

type Props = {
  data?: any[];
};

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
      );
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
      );
    },
  },
];

export const Table: FC<Props> = ({ data = [] }) => {
  return (
    <DataGrid
      rows={data}
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
  );
};
