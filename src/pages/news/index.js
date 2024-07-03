import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "../Component/Card";


const styles = {
    main: {
        width: 'calc(100% - 10vw)',
        maxWidth: '1140px',
        margin: 'auto',
    }
}

const News = () => {
    return (
        
        <Box sx={styles.main}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Card />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card />
                </Grid>
            </Grid>
        </Box>
    );
}

export default News;
