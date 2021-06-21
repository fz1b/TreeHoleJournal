import { Component } from "react";
import customizedTheme from '../customizedTheme.js'
import "./LandingPageStyles.css";
import CardHolder from "../components/CardHolder";
import Header from "../components/Header";
import {Grid, Box} from "@material-ui/core";
import InputForm from "../components/InputForm";
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/core";
import { MdAddCircleOutline} from "react-icons/md";
import DatePicker from '../components/DatePicker';
import JournalModal from '../components/JournalModal'
export class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <Header />
        <div id='my_journals_bg'></div>
        <div id='compose'>

        <ThemeProvider theme={customizedTheme}>
        <Button id='compose_btn' variant="contained" color='primary' startIcon={<MdAddCircleOutline/>}>Compose</Button>
        <DatePicker/>
        </ThemeProvider>
        </div>
        <JournalModal/>

        
        <Grid container>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            spacing={2}
            md={3}
          >

            <Box m={7}>
            {/* <InputForm /> */}
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
