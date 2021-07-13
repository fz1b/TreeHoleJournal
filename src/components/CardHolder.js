import { Component } from "react";
import EntryCards from "./EntryCards";
import journals from "../journals";
import {Grid, Box}  from '@material-ui/core/';


// a container to hold journal cards
export class CardHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: journals,
    };
  }

  render() {
    return (
      <>
      <Box m={5} mt={0}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          {this.state.list.map((j, index) => (
            <Grid item xs={12} sm = {6} md={4} lg = {3}>
              <EntryCards
                content={j}
                isPublic = {this.props.isPublic}
              />
            </Grid>
          ))}
        </Grid>
        </Box>
      </>
    );
  }
}

export default CardHolder;
