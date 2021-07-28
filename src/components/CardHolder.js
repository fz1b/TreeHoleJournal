import EntryCards from './EntryCards';
import { Grid, Box } from '@material-ui/core/';
import JournalCalendar from './JournalCalendar';

export function CardHolder({ showCalendar, journals, updateJournals }) {
    return (
        <>
            <Box m={5} mt={0}>
                <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    spacing={3}
                >
                    {showCalendar && (
                        <>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <JournalCalendar />
                            </Grid>
                        </>
                    )}

                    {journals.map((journal) => (
                        <Grid
                            key={journal._id}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <EntryCards
                                content={journal}
                                updateJournals={updateJournals}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default CardHolder;
