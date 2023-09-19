import { Add, Remove } from '@mui/icons-material';
import styled from 'styled-components';
import { Box, Container, IconButton, Input } from '@mui/material';
import { mobile } from '../../responsive';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItemCard } from './CartItemCard';
import { addItemsToCart, removeItemsFromCart } from '../../redux/actions/cartActions';

const KEY =
    'pk_test_51NfkiWFCYYoSI5YA2lqqyqYbOWPNc3lxXSXNTfJNBu8T1HBxuXuBDqHO4ABrMnNdnvgOYDKWTpthwNfE0gRcw5XT00T9rSMSLY';

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === 'filled' && 'none'};
    background-color: ${(props) => (props.type === 'filled' ? 'black' : 'transparent')};
    color: ${(props) => props.type === 'filled' && 'white'};
`;

const TopTexts = styled.div`
    ${mobile({ display: 'none' })}
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: '20px' })}
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === 'total' && '500'};
    font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    };

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1
        if (stock <= quantity) return ;
        dispatch(addItemsToCart(id, newQty))
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) return;
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
    };
    let total = parseFloat(cart.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0.00)).toFixed(2)
    return (
        <Box>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton onClick={() => navigate('/')}>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Box flex={3} >
                        {cart.cartItems.map((item) => (
                            <Box display={'flex'}>
                                <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <IconButton onClick={()=>decreaseQuantity(item.product, item.quantity)}><Remove /></IconButton>
                                        <Input readOnly type='number' value={item.quantity}/>
                                        <IconButton onClick={()=>increaseQuantity(item.product, item.quantity, item.stock)}><Add /></IconButton>
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
                                </PriceDetail>
                            </Box>
                        ))}
                    </Box>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Shop"
                            image="https://avatars.githubusercontent.com/u/117703705?v=4"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            zipCode={false}
                            
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
        </Box>
    );
};

export default Cart;
