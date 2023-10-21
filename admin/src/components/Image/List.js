import { Badge, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { VisuallyHiddenInput } from '../VisuallyHiddenInput';

export const ImgList = ({ images, element, title, deleteFunc }) => {
    return (
        <Grid item>
            <ImageList cols={2} rowHeight={250}>
                {images.map((image, index) => (
                    <ImageListItem key={index}>
                        <img srcSet={`${image}`} />
                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            title={title}
                            position="top"
                            actionIcon={
                                <IconButton>
                                    {element}
                                    <VisuallyHiddenInput type='file' onChange={deleteFunc}/>
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Grid>
    );
};
