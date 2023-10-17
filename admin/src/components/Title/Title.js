import { Typography } from "@mui/material"

export const Title = (props) => {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    )
}