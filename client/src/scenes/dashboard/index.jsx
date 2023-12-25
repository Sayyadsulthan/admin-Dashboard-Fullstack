import { useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import { useGetDashboardQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";

const Dashboard = (props) => {
  const theme = useTheme();
  // this will return boolean value
  const isNonMediumScreen = useMediaQuery("(min-width:1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },

    {
      field: "products",
      headerName: "# of products",
      flex: 0.4,
      sorted: false,
      renderCell: (params) => params.value.length,
    },

    {
      field: "cost",
      headerName: "Cost",
      flex: 0.5,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {/* This has Title and download button  */}
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to Your Dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px ",
              fontWeight: "bold",
              padding: "10px 20px ",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        display={"grid"}
        mt="20px"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "&> div": {
            gridColumn: isNonMediumScreen ? undefined : "span 12",
          },
        }}
      >
        {/* ROW 1 */}
        {/* custom component */}
        <StatBox
          title={"Total Customers"}
          value={data && data.totalCustomers}
          increase={"+14%"}
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title={"Sales Today"}
          value={data && data.todayStats.totalSales}
          increase={"+21%"}
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* Adding Line chart */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          padding="1rem"
          borderRadius="0.55rem"
          sx={{ backgroundColor: theme.palette.background.alt }}
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title={"Monthly Sales"}
          value={data && data.thisMonthStats.totalSales}
          increase={"+5%"}
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title={"Yearly Sales"}
          value={data && data.yearlySalesTotal}
          increase={"+43%"}
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          // & is used to override and target the classes in MUI
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-toolbarContainer": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id} /* for unique key */
            rows={
              (data && data.transactions) || []
            } /* if the data and transactions in data exist or empty array*/
            // rowsPerPageOptions={[20, 50, 100]}
            columns={columns}
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          sx={{
            backgroundColor: theme.palette.background.alt,
          }}
          // padding
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            BreakDown of real states and information via category for revenue
            made for this yearand total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
