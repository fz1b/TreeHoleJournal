import Grid from '@material-ui/core/Grid';

export default function Coda() {
    return (
    <Grid container spacing={0} direction='column' alignItems='center'>
        <Grid item xs={6}>
            <div>🚧</div>
        </Grid>
        <Grid item xs={6}>
            <h3>You have seen it all.</h3>
        </Grid>
    </Grid>
    )
}
