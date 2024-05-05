import React from "react";
import Layout from "../Layout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./companyPanel.scss";

const CompanyPanel = () => {
  const pieChartData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const lineChartData = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <Layout>
      <div className="company-panel">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="widget widget-1" elevation={3}>
              <Typography variant="h6">Widget 1</Typography>
              <Typography variant="body1">
                Bu bir admin paneli widgetidir.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="widget widget-2" elevation={3}>
              <Typography variant="h6">Widget 2</Typography>
              <Typography variant="body1">
                Bu bir admin paneli widgetidir.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="widget widget-3" elevation={3}>
              <Typography variant="h6">Widget 3</Typography>
              <Typography variant="body1">
                Bu bir admin paneli widgetidir.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="widget widget-4" elevation={3}>
              <Typography variant="h6">Widget 4</Typography>
              <Typography variant="body1">
                Bu bir admin paneli widgetidir.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className="chart-container" elevation={12}>
              <PieChart width={600} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={pieChartData}
                  fill="#0C356A"
                  label
                />
              </PieChart>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="chart-container" elevation={3}>
              <LineChart width={600} height={400} data={lineChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#0C356A" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default CompanyPanel;
