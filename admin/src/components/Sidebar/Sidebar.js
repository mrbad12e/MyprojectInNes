import { Drawer, Toolbar, Typography, Divider, List, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Fragment } from 'react';
import { mainListItems, secondaryListItems } from '../Navbar/listItems'
export const Sidebar = ({ open }) => {
    return (
        <Fragment>
            <Drawer variant="permanent" open={open}>
                <Divider />
                <List component="nav">
                    {mainListItems}
                    <Divider sx={{ my: 1 }} />
                    {secondaryListItems}
                </List>
            </Drawer>
        </Fragment>
    );
};
