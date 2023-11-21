import { ErrorRounded } from '@mui/icons-material'
import { Typography, Container } from '@mui/material'

export const NotFound = () => {
    return (
        <Container>
            <Typography variant="h1" sx={{my: 2}}><ErrorRounded/> 404</Typography>
            <Typography variant="h3" sx={{my: 2}}>Page not found</Typography>
            <Typography variant="h6" sx={{my: 2}}>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</Typography>
        </Container>
    )
}