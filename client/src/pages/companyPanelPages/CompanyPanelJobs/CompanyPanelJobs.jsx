import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useSelector } from "react-redux";
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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CompanyPanelJobsCreate from "./CompanyPanelJobsCreate";

const CompanyPanelJobs = () => {
  const { currentCompany } = useSelector((state) => state.company);
  const [jobApplications, setJobApplications] = useState([]);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const companyId = currentCompany._id;
        const response = await axios.get(`/jobs/company/${companyId}`);
        setJobApplications(response.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };
    if (currentCompany) {
      fetchJobApplications();
    }
  }, [currentCompany]);

  const handleAddJob = () => {
    setIsCreateJobOpen(true);
  };

  const handleCloseCreateJob = () => {
    setIsCreateJobOpen(false);
  };

  return (
    <Layout>
      <div className="company-panel-jobs">
        <div className="add-job-button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddJob}
            className="add-job-button"
          >
            Yeni İş İlanı Ekle
          </Button>
        </div>
        <h1>İş İlanlarım</h1>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell className="table-header-cell">İş Başlığı</TableCell>
                <TableCell className="table-header-cell">Lokasyon</TableCell>
                <TableCell className="table-header-cell">İş Tipi</TableCell>
                <TableCell className="table-header-cell">
                  Çalışma Şekli
                </TableCell>
                <TableCell className="table-header-cell">Düzenle</TableCell>
                <TableCell className="table-header-cell">Başvuranlar</TableCell>
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
                      className="edit-btn"
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/company-panel/job/${data._id}`}
                      startIcon={<EditIcon />}
                    >
                      Düzenle
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="applications-btn"
                      variant="contained"
                      color="success"
                      component={Link}
                      to={`/company-panel/job-applications/${data._id}`}
                      startIcon={<LibraryBooksIcon />}
                    >
                      Başvurular
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {isCreateJobOpen && (
        <CompanyPanelJobsCreate onClose={handleCloseCreateJob} />
      )}
    </Layout>
  );
};

export default CompanyPanelJobs;
