import { Component } from "react";
import CardHolder from "../components/CardHolder";
import MyCalendar from "../components/MyCalendar";
import Header from "../components/Header";
import { ListGroup } from "react-bootstrap";
import {Grid, Box} from "@material-ui/core";
import InputForm from "../components/InputForm";

export class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <Header />
        <Grid container>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            spacing={2}
            md={3}
          >

            <Box m={7}>
            <InputForm />
            </Box>
          </Grid>
          <Grid md={9}>
            <CardHolder databaseFlag="" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LandingPage;
