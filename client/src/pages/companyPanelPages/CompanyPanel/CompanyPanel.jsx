import React from "react";
import Layout from "../Layout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./companyPanel.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CompanyPanel = () => {
  const { currentCompany } = useSelector((state) => state.company);

  return (
    <Layout>
      <div className="company-panel">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/company-panel/jobs"
              className="widget-link"
              style={{ textDecoration: "none" }}
            >
              <Paper className="widget widget-1" elevation={3}>
                <Typography variant="h5">Toplam İş İlanı </Typography>
                <Typography variant="h6">
                  {currentCompany?.jobs?.length || "Loading..."}
                </Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/company-panel/events"
              className="widget-link"
              style={{ textDecoration: "none" }}
            >
              <Paper className="widget widget-2" elevation={3}>
                <Typography variant="h5">Toplam Etkinlik </Typography>
                <Typography variant="h6">
                  {currentCompany?.events?.length || "Loading..."}
                </Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/company-panel"
              className="widget-link"
              style={{ textDecoration: "none" }}
            >
              <Paper className="widget widget-3" elevation={3}>
                <Typography variant="h5">Profil Ziyareti</Typography>
                <Typography variant="h6">262 </Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              to="/company-panel"
              className="widget-link"
              style={{ textDecoration: "none" }}
            >
              <Paper className="widget widget-4" elevation={3}>
                <Typography variant="h5">Etkileşim Sayısı</Typography>
                <Typography variant="h6">524</Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default CompanyPanel;
