import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import "./companyPanelEvents.scss";
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
import CompanyPanelEventsCreate from "./CompanyPanelEventsCreate";

const CompanyPanelEvents = () => {
  const { currentCompany } = useSelector((state) => state.company);
  const [events, setEvents] = useState([]);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const ids = currentCompany.events.join(",");
        const response = await axios.get(`/events?ids=${ids}`);
        setEvents(response.data.eventApplications);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [currentCompany]);

  const handleAddEvent = () => {
    setIsCreateEventOpen(true);
  };

  const handleCloseCreateEvent = () => {
    setIsCreateEventOpen(false);
  };

  return (
    <Layout>
      <div className="company-panel-events">
        <div className="add-event-button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEvent}
            className="add-event-button"
          >
            Yeni Etkinlik Ekle
          </Button>
        </div>
        <h1>Etkinlikler</h1>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell className="table-header-cell">
                  Etkinlik Adı
                </TableCell>
                <TableCell className="table-header-cell">
                  Etkinlik Tipi
                </TableCell>
                <TableCell className="table-header-cell">
                  Etkinlik Tarihi
                </TableCell>
                <TableCell className="table-header-cell">
                  Son Başvuru Tarihi
                </TableCell>
                <TableCell className="table-header-cell">Lokasyon</TableCell>
                <TableCell className="table-header-cell">Düzenle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>
                    {new Date(event.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(event.applicationDeadline).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Button
                      className="edit-btn"
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/company-panel/event/${event._id}`}
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
      {isCreateEventOpen && <CompanyPanelEventsCreate onClose={handleCloseCreateEvent} />}
    </Layout>
  );
};

export default CompanyPanelEvents;
