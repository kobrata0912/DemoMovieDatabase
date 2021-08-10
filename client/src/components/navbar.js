import Container from '@material-ui/core/Container'
import Grid from "@material-ui/core/Grid"

function Navbar() {
    return (
        <Container width="100%" height="10%">
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="baseline">
                <Grid item xs={6}>
                    My Movies Collection
                </Grid>
                <Grid item xs={6}>
                    Search
                </Grid>
            </Grid>
        </Container>
    );
}

export default Navbar;
