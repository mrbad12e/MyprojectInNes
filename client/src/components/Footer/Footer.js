import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@mui/icons-material';
import {Container} from '@mui/material'
import styled from 'styled-components';
import './footer.css'
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;
const Footer = () => {
    return (
        <Container maxWidth={false} sx={{ background: 'rgb(17, 203, 203)', display: 'flex' }}>
            <div className='footer-left'>
                <h1>Mine.</h1>
                <p className='footer-desc'>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                    alteration in some form, by injected humour, or randomised words which don’t look even slightly
                    believable.
                </p>
                <div className='footer-social-container'>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Pinterest />
                    </SocialIcon>
                </div>
            </div>
            <div className='footer-center'>
                <h3 className='footer-title'>Useful Links</h3>
                <ul className='footer-list'>
                    <li className='footer-listitem'>Home</li>
                    <li className='footer-listitem'>Cart</li>
                    <li className='footer-listitem'>Man Fashion</li>
                    <li className='footer-listitem'>Woman Fashion</li>
                    <li className='footer-listitem'>Accessories</li>
                    <li className='footer-listitem'>My Account</li>
                    <li className='footer-listitem'>Order Tracking</li>
                    <li className='footer-listitem'>Wishlist</li>
                    <li className='footer-listitem'>Terms</li>
                </ul>
            </div>
            <div className='footer-right'>
                <h3 className='footer-title'>Contact</h3>
                <div className='footer-contact-item'>
                    <Room style={{ marginRight: '10px' }} /> 221B Baker Street
                </div>
                <div className='footer-contact-item'>
                    <Phone style={{ marginRight: '10px' }} /> +84 012 345 6789
                </div>
                <div className='footer-contact-item'>
                    <MailOutline style={{ marginRight: '10px' }} /> saptheoanh123@gmail.com
                </div>
                <img className='footer-payment' src="https://i.ibb.co/Qfvn4z6/payment.png" alt=''/>
            </div>
        </Container>
    );
};

export default Footer;
