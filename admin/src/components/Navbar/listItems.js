import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Dashboard, ShoppingCart, People, Layers, Assignment, Inventory } from '@mui/icons-material';
import { Fragment } from 'react';

export const mainListItems = (
    <Fragment>
        <ListItemButton href='/dashboard'>
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton href='/orders'>
            <ListItemIcon>
                <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton href='/customers'>
            <ListItemIcon>
                <People />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItemButton>
        <ListItemButton href='/products'>
            <ListItemIcon>
                <Inventory/>
            </ListItemIcon>
            <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <Layers />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
        </ListItemButton>
    </Fragment>
);

export const secondaryListItems = (
    <Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton href='/returns'>
            <ListItemIcon>
                <Assignment/>
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <Assignment />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <Assignment/>
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </Fragment>
);
