import { Link } from 'react-router-dom';
import './categoryitem.css'
const CategoryItem = ({ item }) => {
    return (
        <div className='cat-item-container'>
            <Link to={`/products/${item.cat}`}>
            <img className='cat-item-image' src={item.img} alt=''/>
            <div className='cat-item-info'>
                <h1 className='cat-item-title'>{item.title}</h1>
                <button className='cat-item-button-shop'>SHOP NOW</button>
            </div>
            </Link>
        </div>
    );
};

export default CategoryItem;
