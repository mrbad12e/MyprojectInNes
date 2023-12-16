import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { categories } from '../../data';
import { useNavigate } from 'react-router-dom';
const Categories = () => {
    const navigate = useNavigate();
    return (
        <ImageList cols={3} sx={{ display: { xs: 'none', md: 'grid' } }}>
            {categories.map((item) => (
                <ImageListItem key={item.id}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        sx={{
                            background:
                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            color: 'white'
                        }}
                        title={item.title}
                        position='bottom'
                        actionIcon={
                            <IconButton 
                                children={item.icon}
                                sx={{ ':hover': { bgcolor: 'white' }, color: 'teal' }}
                                onClick={() => navigate(`/products/${item.cat}`)}/>
                        }
                        actionPosition='left'
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default Categories;
