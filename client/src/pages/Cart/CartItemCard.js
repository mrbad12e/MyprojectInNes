import { Button, Container, Link, Typography, Box } from '@mui/material'
import {Fragment} from 'react'

export const CartItemCard = ({ item, deleteCartItem }) => {
    const backend_url = process.env.BACKEND_URL
    const srcSet = `${backend_url}/${item.img.replace(/\\/g, '/')}`
    return (
        <Fragment>
            <Box display={'flex'} flex={1} my={1}>
                <img src={srcSet} style={{ width: '200px' }}/>
                <Box p={1} display={'inline-flex'} justifyContent={'space-evenly'} flexDirection={'column'}>
                    <Link href={`/product/${item._id}`} underline='none'>{item.title}</Link>
                    <Typography variant='h6'>Price:{'\t'}<b>${item.price}</b></Typography>
                    <Button sx={{width: '10vw'}} variant='outlined' color='warning' onClick={() => deleteCartItem(item.product)}>
                        Remove
                    </Button>
                </Box>
            </Box>
        </Fragment>
    )
}