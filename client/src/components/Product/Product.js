import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Product = ({ item }) => {
    const backend_url = process.env.BACKEND_URL;
    const navigate = useNavigate();
    return (
        <ImageListItem >
            <img src={`${backend_url}/${item.img[0].replace(/\\/g, '/')}`} alt={item.title} />
            <ImageListItemBar
                sx={{
                    background: 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    color: 'white',
                }}
                title={item.title}
                position="bottom"
                actionIcon={
                    <IconButton
                        children={<ShoppingCartOutlined />}
                        sx={{ ':hover': { bgcolor: 'white', color: 'teal' }, color: 'white' }}
                        onClick={() => navigate(`/product/${item._id}`)}
                    />
                }
                actionPosition="left"
            />
        </ImageListItem>
    );
};

export default Product;
