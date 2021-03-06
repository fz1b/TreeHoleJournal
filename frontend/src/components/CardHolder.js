import EntryCards from './EntryCards';
import { Grid, Box } from '@material-ui/core/';
import JournalCalendar from './JournalCalendar';

export function CardHolder({ handleDateSelection,showCalendar, validDates,journals, refreshJournals, onDelete }) {
    return (
        <>
            <Box m={5} mt={0}>
                <Grid
                    container
                    direction='row'

                    spacing={3}
                >
                    {showCalendar && (
                        <>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <JournalCalendar journals={journals} validDates={validDates} handleDateSelection={handleDateSelection}/>
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
                                refreshJournals={refreshJournals}
                                onDelete={onDelete}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default CardHolder;
