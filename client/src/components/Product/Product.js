import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Card, CardContent, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom';
import './product.css'

const ContentCSS = {
    position: 'absolute', 
    zIndex: 3, 
    opacity: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    top: 0, left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.5s ease',
    cursor: 'pointer', 
    ':hover': { opacity: 1 },
}
const cardWidthCSS = () => {
    if (window.location.pathname === '/') return '23%'
    else return '31%'
}
const Product = ({ item }) => {
    const backend_url = process.env.BACKEND_URL
    return (
        <Card sx={{ width: cardWidthCSS, position: 'relative', margin: '8px' }}>
            <CardMedia component="img" image={`${backend_url}/${item.img[0].replace(/\\/g, '/')}`} sx={{ zIndex: 2 }}/>
            
            <CardContent sx={ContentCSS}>
                <div className='product-icon'>
                    <ShoppingCartOutlined />
                </div>
                <div className='product-icon'>
                    <Link to={`/product/${item._id}`}>
                    <SearchOutlined />
                    </Link>
                </div>
                <div className='product-icon'>
                    <FavoriteBorderOutlined />
                </div>
            </CardContent>
        </Card>
    );
};

export default Product;
