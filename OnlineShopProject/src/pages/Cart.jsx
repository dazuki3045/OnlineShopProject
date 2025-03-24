import React from 'react';
import { useStoreProject } from "../features/store.js";
import Product from "../components/Product.jsx";
import { List } from "antd";

const Cart = () => {
    const { cart } = useStoreProject();

    return (
        <div>
            <h2>Корзина</h2>
            <List
                dataSource={cart}
                grid={true}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Product product={item} isCartPage={true} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Cart;
