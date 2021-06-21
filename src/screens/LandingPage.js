import { Component } from "react";
import customizedTheme from '../customizedTheme.js'
import "../stylesheets/LandingPageStyles.css";
import CardHolder from "../components/CardHolder";
import Header from "../components/Header";
import { Grid, Box } from "@material-ui/core";
import InputForm from "../components/InputForm";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core";
import { MdAddCircleOutline } from "react-icons/md";
import DatePicker from "../components/DatePicker";
export class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <Header />
        <div id="my_journals_bg"></div>
        <div id="compose">
          <ThemeProvider theme={customizedTheme}>
            <Button
              id="compose_btn"
              variant="contained"
              color="primary"
              startIcon={<MdAddCircleOutline />}
            >
              Compose
            </Button>
            <DatePicker />
          </ThemeProvider>
        </div>

        <CardHolder databaseFlag="" />
      </div>
    );
  }
}

export default LandingPage;
