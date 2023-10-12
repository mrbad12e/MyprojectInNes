import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Dashboard, ShoppingCart, People, BarChart, Layers, Assignment } from '@mui/icons-material';
import { Fragment } from 'react';

export const mainListItems = (
    <Fragment>
        <ListItemButton>
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <People />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChart />
            </ListItemIcon>
            <ListItemText primary="Reports" />
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
        <ListItemButton>
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
