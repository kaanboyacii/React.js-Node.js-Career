import { Link } from "react-router-dom";
import "./eventSlider.scss";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { useEffect, useState } from "react";

const EventSlider = () => {
  const [latestEvents, setLatestEvents] = useState([]);
  const [topApplicantEvents, setTopApplicantEvents] = useState([]);

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        const response = await fetch("/events/getLatestEvents");
        const data = await response.json();
        setLatestEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching latest events:", error);
      }
    };

    const fetchTopApplicantEvents = async () => {
      try {
        const response = await fetch("/events/getTopApplicantEvents");
        const data = await response.json();
        setTopApplicantEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching top applicant events:", error);
      }
    };

    fetchLatestEvents();
    fetchTopApplicantEvents();
  }, []);

  return (
    <div className="eventSlider">
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <h1>Güncel Etkinlikler</h1>
          <Carousel>
            {latestEvents.map((event, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: 600,
                  maxBlockSize: 1000,
                  borderRadius: 5,
                  marginRight: 1,
                  marginLeft: 1,
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={event.img}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {event.description}
                    </Typography>
                    <Link to={`/event/${event._id}`}>
                      <Button variant="contained" size="large">
                        Hemen Başvur
                      </Button>
                    </Link>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={8}>
          <h1>En Çok Başvurulan Etkinlikler</h1>
          <Carousel>
            {topApplicantEvents.map((event, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: 600,
                  maxBlockSize: 1000,
                  borderRadius: 5,
                  marginRight: 1,
                  marginLeft: 1,
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={event.img}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {event.description}
                    </Typography>
                    <Link to={`/event/${event._id}`}>
                      <Button variant="contained" size="large">
                        Hemen Başvur
                      </Button>
                    </Link>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </div>
  );
};

export default EventSlider;
