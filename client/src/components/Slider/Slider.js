import { Container } from '@mui/material'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/swiper-bundle.css';
import { categories } from '../../data';
const MySlider = () => {
    return (
        <Container maxWidth="xl" sx={{ display: { xs: 'block', md: 'none' } }}>
            <Swiper spaceBetween={50} slidesPerView={1}>
                {categories.map((category) => (
                    <SwiperSlide key={category.id} >
                        <img src={category.img} alt={category.title} width={'100%'}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    )
}
export default MySlider;