import { Button, Container, Link, Typography, Box } from '@mui/material'
import {Fragment} from 'react'

export const CartItemCard = ({ item, deleteCartItem }) => {
    return (
        <Fragment>
            <Box display={'flex'} flex={1}>
                <img src={item.img} style={{ width: '200px' }}/>
                <Box p={1} display={'inline-flex'} justifyContent={'space-evenly'} flexDirection={'column'}>
                    <Link href={`/product/${item._id}`} underline='none'>{item.title}</Link>
                    <Typography variant='h6'>Price:{'\t'}<b>${item.price}</b></Typography>
                    <Button variant='outlined' color='warning' onClick={() => deleteCartItem(item._id)}>
                        Remove
                    </Button>
                </Box>
            </Box>
        </Fragment>
    )
}