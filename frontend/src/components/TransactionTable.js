import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Button, Box, Typography } from "@mui/material";

const columns = [
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
      editable: true,
    },
    {
      field: 'ref',
      headerName: 'Reference',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'withdraw',
      headerName: 'Withdrawals',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },

    {
        field: 'deposits',
        headerName: 'Deposits',
        type: 'number',
        width: 110,
        editable: true,
      },

      {
        field: 'balance',
        headerName: 'Balance',
        type: 'number',
        width: 110,
        editable: true,
      },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  
  export default function TransactionHistory() {
    return (
      <Box sx={{ height: 400, width: '90%',mx:'auto',mt:3,bgcolor:'#ffff',boxShadow:3,mb:2 }}>
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
          
        />
      </Box>
    );
  }
  