import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from "./Modal";
import Button from "@material-ui/core/Button";
import {Card,CardActions, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  coverImage: {
    borderRadius:"4px 4px 0 0"
  }
});

export default function Feelings(props) {
  const classes = useStyles();

  const [show, setShow] = useState(false);

  const showDetails = () => {
    setShow(!show);
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="props.content.name"
          height="200"
          image={props.content.image}
          className= {classes.coverImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {props.content.name}
          </Typography>
          <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '20rem'}}> 
          <Typography variant="body2" color="textSecondary" component="p" noWrap>
          {props.content.description}
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="secondary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
