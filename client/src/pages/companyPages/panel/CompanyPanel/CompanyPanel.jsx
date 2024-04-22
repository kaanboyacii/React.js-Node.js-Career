import React from "react";
import Layout from "../Layout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./companyPanel.scss";

const CompanyPanel = () => {
  return (
    <Layout>
      <div className="content">
        <h1>Admin Paneli</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="widget widget-1">
              <Typography variant="h6">Widget 1</Typography>
              <Typography variant="body1">
                Bu bir admin paneli widgetidir.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="widget widget-2">
              <Typography variant="h6">Widget 2</Typography>
              <Typography variant="body1">
                Bu bir admin paneli widgetidir.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="widget widget-3">
              <Typography variant="h6">Widget 3</Typography>
              <Typography variant="body1">
                Bu bir admin paneli widgetidir.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="widget widget-4">
              <Typography variant="h6">Widget 4</Typography>
              <Typography variant="body1">
                Bu bir admin paneli widgetidir.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default CompanyPanel;
