import { Col, Row, Select, Slider, Spin } from "antd";
import { useProducts } from "../api/requests.js";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./pages.module.css";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useFilters } from "../features/store.js";
import Product from "../components/Product.jsx";
import { useState, useEffect } from "react";

const Home = () => {
    const { data, isLoading, error } = useProducts();
    const { type, setType } = useFilters();

    const [priceRange, setPriceRange] = useState([50, 200]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    useEffect(() => {
        if (data && data.products) {
            const filtered = data.products.filter(product =>
                product.price >= priceRange[0] && product.price <= priceRange[1]
            );
            setFilteredProducts(filtered);
        }
    }, [data, priceRange]);

    if (isLoading) return <Spin />;
    if (error) return <p>Произошла ошибка....</p>;

    return (
        <>
            <h2>цена от 0 до 500</h2>
            <Slider
                range
                min={0}
                max={500}
                defaultValue={[50, 200]}
                onChange={handlePriceChange}
            />
            <Select
                className={styles.select}
                value={type}
                onChange={(value) => setType(value)}
                options={[
                    { label: 'все', value: 'all' },
                    { label: 'Популярное', value: 'popular' },
                    { label: 'Гаджеты', value: 'gadgets' },
                ]}
            />

            <Row gutter={16}>
                {filteredProducts.map((product) => (
                    <Col span={6} key={product.id}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>

            <>
                <h2>Популярные Товары</h2>
                <Swiper
                    direction="horizontal"
                    navigation
                    modules={[Navigation]}
                    slidesPerView={3}
                    className="mySwiper"
                >
                    {data.products.slice(0, 5).map((product) => (
                        <SwiperSlide key={product.id}>
                            <Product product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        </>
    );
};

export default Home;
