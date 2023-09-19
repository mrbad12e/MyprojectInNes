import { Container, InputAdornment, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProduct } from '../../redux/actions/productActions';

const SearchBox = () => {
    const [keyword, setKeyWord] = useState('');
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            getProduct(keyword)
            navigate(`/products/${keyword}`);
        } else navigate('/store');
    };
    return (
        <Container maxWidth='md'>
            <TextField type="search" label="Search"
                onChange={(e) => setKeyWord(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleSearch}>
                                <SearchIcon/>
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Container>
    );
};

export default SearchBox;
