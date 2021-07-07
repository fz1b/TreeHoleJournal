import { Component } from "react";
import EntryCards from "./EntryCards";
import products from "../feelings";
import DatabaseHandler from "../Backend/DatabaseHandler";
import {Grid, Box}  from '@material-ui/core/';

// Properties: database_flag
// a container to hold journal cards
export class CardHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: products,
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
          {this.state.list.map((f, index) => (
            <Grid item xs={12} sm = {6} md={4} lg = {3}>
              <EntryCards
                content={f}
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
