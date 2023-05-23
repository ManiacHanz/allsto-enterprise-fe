import { numToUSD, setPrecision } from "@/utils/common";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
      console.log(14, params);
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

const rows = Array.from({ length: 10 }, (x, idx) => {
  return {
    id: idx,
    link: `https://alls.to/Web3-Saas-Inc/payment${idx}`,
    price: numToUSD(setPrecision(Math.random() * 100, 2)),
    item: Math.random() > 0.5 ? "Monthly Basic Subscription" : undefined,
    createdAt: new Date().toLocaleString(),
  };
});

export const Table = () => {
  return (
    <DataGrid
      rows={rows}
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
