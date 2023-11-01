import Image from "../../img/back.jpg";
import Image2 from "../../img/people.webp";
import "./eventSlider.scss";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";

const EventSlider = () => {
  const eventData = [
    {
      title: "Etkinlik 1",
      description:
        "          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, aut voluptatem aperiam magnam magni tenetur atque! Quia temporibus pariatur eos in aperiam ipsum repellat, debitis, aut tenetur, dignissimos numquam corporis nulla iure corrupti ea mollitia! Debitis ipsa veritatis accusamus incidunt voluptas inventore. Officia doloribus aut, est tempora rem eveniet quod.",
      image: Image,
    },
    {
      title: "Etkinlik 2",
      description:
        "          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, aut voluptatem aperiam magnam magni tenetur atque! Quia temporibus pariatur eos in aperiam ipsum repellat, debitis, aut tenetur, dignissimos numquam corporis nulla iure corrupti ea mollitia! Debitis ipsa veritatis accusamus incidunt voluptas inventore. Officia doloribus aut, est tempora rem eveniet quod.",
      image: Image2,
    },
    {
      title: "Etkinlik 2",
      description:
        "          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, aut voluptatem aperiam magnam magni tenetur atque! Quia temporibus pariatur eos in aperiam ipsum repellat, debitis, aut tenetur, dignissimos numquam corporis nulla iure corrupti ea mollitia! Debitis ipsa veritatis accusamus incidunt voluptas inventore. Officia doloribus aut, est tempora rem eveniet quod.",
      image: Image2,
    },
    {
      title: "Etkinlik 2",
      description:
        "          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, aut voluptatem aperiam magnam magni tenetur atque! Quia temporibus pariatur eos in aperiam ipsum repellat, debitis, aut tenetur, dignissimos numquam corporis nulla iure corrupti ea mollitia! Debitis ipsa veritatis accusamus incidunt voluptas inventore. Officia doloribus aut, est tempora rem eveniet quod.",
      image: Image2,
    },
  ];

  return (
    <div className="eventSlider">
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <h1>Güncel Etkinlikler</h1>
          <Carousel>
            {eventData.map((event, index) => (
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
                    image={event.image}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {event.description}
                    </Typography>
                    <Button variant="contained" size="large">
                      Hemen Başvur
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={8}>
          <h1>Online Etkinlikler</h1>
          <Carousel>
            {eventData.map((event, index) => (
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
                    image={event.image}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {event.description}
                    </Typography>
                    <Button variant="contained" size="large">
                      Hemen Başvur
                    </Button>
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
