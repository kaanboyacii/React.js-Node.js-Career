import React from 'react';
import Layout from "../Layout";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector } from 'react-redux';
import "./companyPanelProfile.scss";

const CompanyPanelProfile = () => {
  const { currentCompany } = useSelector((state) => state.company);

  return (
    <Layout>
      <div className="company-panel-profile">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <div className="avatar-container">
                  <Avatar
                    alt="Company Logo"
                    src={currentCompany.img}
                    sx={{ width: 200, height: 200 }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardContent>
                <form>
                  <TextField
                    label="Şirket Adı"
                    value={currentCompany.name}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="Email"
                    value={currentCompany.email}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="Telefon"
                    value={currentCompany.phone}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="Adres"
                    value={currentCompany.address}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="Web Sitesi"
                    value={currentCompany.website}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Güncelle
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default CompanyPanelProfile;
