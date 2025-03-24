import { Card, Image } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useStoreProject } from "../features/store.js";
import styles from "./Product.module.css";

const Product = ({ product }) => {
    const { addToCart, addToFavorite, removeFromCart, removeFromFavorites, cart, favorites } = useStoreProject();

    const [clickedFavorite, setClickedFavorite] = useState(favorites.some(item => item.id === product.id));

    const isInCart = cart.some((item) => item.id === product.id);

    const addCart = () => {
        if (isInCart) {
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
    };

    const addFavorites = () => {
        if (clickedFavorite) {
            removeFromFavorites(product.id);
        } else {
            addToFavorite(product);
        }
        setClickedFavorite(!clickedFavorite);
    };


    useEffect(() => {
        setClickedFavorite(favorites.some(item => item.id === product.id));
    }, [favorites]);

    return (
        <Card title={product.title} cover={<Image src={product.thumbnail} alt={product.title} width="100%" />}>
            <p>Цена: {product.price}</p>
            <p>Рейтинг: {product.rating}</p>
            <div className={styles.icons}>
                <ShoppingCartOutlined
                    onClick={addCart}
                    style={{ cursor: "pointer", color: isInCart ? 'green' : 'gray' }}
                />
                <HeartOutlined
                    onClick={addFavorites}
                    style={{ cursor: "pointer", color: clickedFavorite ? 'red' : 'gray' }}
                />
            </div>
        </Card>
    );
};

export default Product;
