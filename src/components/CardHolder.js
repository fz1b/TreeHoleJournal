import {Component, useState, useEffect} from "react";
import EntryCards from "./EntryCards";
import journals from "../journals";
import {Grid, Box}  from '@material-ui/core/';
import {getExploreJournals} from "../services/JournalServices";

export function CardHolder(props){
  const [journals, setJournals] = useState([]);

  useEffect( ()=> {
      getExploreJournals().then( res =>{
          setJournals(res);
      }).catch( err => {
          setJournals([]);
          console.error(err);
      })
  },[]);


  const updateJournal = (journal_id, newJournal) => {
      let index = journals.findIndex((journal)=>{
          return journal._id===journal_id;
      });
      let newJournals = [...journals];
      newJournals[index] = newJournal;
      setJournals(newJournals);
  }

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
            {journals.map((journal, index) => (
                <Grid item xs={12} sm = {6} md={4} lg = {3}>
                  <EntryCards
                      content={journal}
                      isPublic = {props.isPublic}
                      updateJournal = {updateJournal}
                  />
                </Grid>
            ))}
          </Grid>
        </Box>
      </>
  );

}

export default CardHolder;
