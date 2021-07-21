import {useState, useEffect, useContext} from "react";
import EntryCards from "./EntryCards";
import {Grid, Box}  from '@material-ui/core/';
import {getExploreJournals, getUserJournals} from "../services/JournalServices";
import AuthContext from "../authAPI/auth-context";

export function CardHolder(props){
    const auth = useContext(AuthContext);
    const [journals, setJournals] = useState([]);

    useEffect( ()=> {
        if(props.isPublic){
            getExploreJournals().then( res =>{
                setJournals(res);
            }).catch( err => {
                setJournals([]);
                console.error(err);
            })
        } else {
            getUserJournals(auth.token).then( res =>{
                setJournals(res);
            }).catch( err => {
                setJournals([]);
                console.error(err);
            })
        }
        },[]);


    const updateJournal = (journal_id, newJournal) => {
        // check if the newJournal is in the valid format
        if (Object.keys(newJournal).length > 0) {
            let index = journals.findIndex((journal)=>{
                return journal._id===journal_id;
            });
            let newJournals = [...journals];
            newJournals[index] = newJournal;
            setJournals(newJournals);
        }
    }

    return (
        <>
            <Box m={5} mt={0}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}>
                {journals.map((journal) => (
                    <Grid key={journal._id} item xs={12} sm = {6} md={4} lg = {3}>
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
