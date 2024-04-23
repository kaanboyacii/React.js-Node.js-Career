import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./companyPanelJobs.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const CompanyPanelJobs = () => {
  const { currentCompany } = useSelector((state) => state.company);
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const ids = currentCompany.jobs.join(",");
        const response = await axios.get(`/jobs?ids=${ids}`);
        setJobApplications(response.data.jobApplications);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, [currentCompany]);

  return (
    <Layout>
      <div className="company-panel-jobs">
        <h1>İş İlanlarım</h1>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell className="table-header-cell">İş Başlığı</TableCell>
                <TableCell className="table-header-cell">Lokasyon</TableCell>
                <TableCell className="table-header-cell">İş Tipi</TableCell>
                <TableCell className="table-header-cell">Çalışma Şekli</TableCell>
                <TableCell className="table-header-cell">Düzenle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobApplications.map((data, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.location}</TableCell>
                  <TableCell>{data.type}</TableCell>
                  <TableCell>{data.workFrom}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/company-panel/job/${data._id}`}
                      startIcon={<EditIcon />}
                    >
                      Düzenle
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default CompanyPanelJobs;
