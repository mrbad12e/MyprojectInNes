import { Link, Typography } from '@mui/material';
import { Title } from '../../components/Title/Title';
import { Fragment } from 'react';

export const Deposit = () => {
    return (
        <Fragment>
            <Title>Recent Deposits</Title>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary">
                    View balance
                </Link>
            </div>
        </Fragment>
    );
};
