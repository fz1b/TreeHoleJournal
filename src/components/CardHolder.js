import { Component } from "react";
import EntryCards from "./EntryCards";
import products from "../feelings";
import DatabaseHandler from "../DatabaseHandler";
import {Grid, Box}  from '@material-ui/core/';

// Properties: database_flag
// a container to hold journal cards
export class CardHolder extends Component {
  constructor(props) {
    super(props);
    this.databaseFlag = this.props.databaseFlag;
    this.state = {
      journals: this.pullFromDatabase(this.databaseFlag),
      list: products,
    };
  }

  remove(index) {
    let newlist = [...this.state.list];
    newlist.splice(index, 1);
    this.setState({
      list: newlist,
    });
  }

  addProduct(name, location, url, description) {
    let newProduct = {
      id: `_${this.state.count}`,
      name: name,
      image: url,
      location: location,
      description: description,
    };
    this.setState({
      list: [...this.state.list, newProduct],
      count: this.state.count + 1,
    });
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
                removeItem={this.remove.bind(this, index)}
              />
            </Grid>
          ))}
        </Grid>
        </Box>
      </>
    );
  }

  // pull all journals from the database
  pullFromDatabase() {
    // TODO:change to real flag once db is implemented
    return DatabaseHandler.pullFromDatabase(this.databaseFlag);
  }

  // modify a journal in the database
  editJournal(index, newJournal) {
    // TODO: to be implemented
    alert("Not Implemented");
  }

  addJournal(journal) {
    // TODO: to be implemented
    alert("Not Implemented");
  }

  // delete a journal from the database
  deleteJournal(index) {
    // delete from fake database for now
    // TODO: send query to delete data from the database
    if (DatabaseHandler.deleteJournal(this.databaseFlag, index)) {
      let newJournals = Object.assign([], this.state.journals);
      newJournals.splice(index, 1);
      this.setState({ journals: newJournals });
      return true;
    } else {
      alert("Failed to delete");
    }
  }
}

export default CardHolder;
