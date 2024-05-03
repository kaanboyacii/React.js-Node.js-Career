import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
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
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const CompanyPanelApplications = () => {
 

  return (
    <Layout>
      <div className="company-panel-applications">
      </div>
    </Layout>
  );
};

export default CompanyPanelApplications;
