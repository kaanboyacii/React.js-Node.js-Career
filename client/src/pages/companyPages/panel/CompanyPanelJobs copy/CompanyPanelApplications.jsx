import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import axios from "axios";
import "./companyPanelApplications.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const CompanyPanelApplications = () => {
  const [applicants, setApplicants] = useState([]);
  const [userNames, setUserNames] = useState({});
  const location = useLocation();
  const jobId = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get(`/jobs/${jobId}`);
        setApplicants(response.data.applicants);
        const userIds = response.data.applicants.map(
          (applicant) => applicant.user
        );
        await fetchUserNames(userIds);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, [jobId]);

  const fetchUserNames = async (userIds) => {
    try {
      const response = await axios.get(`/users?ids=${userIds.join(",")}`);
      const userData = response.data.Users;
      const names = {};
      userData.forEach((user) => {
        names[user._id] = user.name;
      });
      setUserNames(names);
    } catch (error) {
      console.error("Error fetching user names:", error);
    }
  };

  return (
    <Layout>
      <div className="company-panel-applications">
        <h1>İş Başvuruları</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Başvuran Adı</TableCell>
                <TableCell>Durum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicants.map((applicant, index) => (
                <TableRow key={index}>
                  <TableCell>{userNames[applicant.user]}</TableCell>
                  <TableCell>{applicant.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default CompanyPanelApplications;
