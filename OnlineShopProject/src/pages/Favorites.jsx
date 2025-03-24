import React from 'react';
import { useStoreProject } from "../features/store.js";
import Product from "../components/Product.jsx";
import { List } from "antd";

const Favorites = () => {
    const { favorites } = useStoreProject();

    return (
        <div>
            <h2>Избранное</h2>
            <List
                dataSource={favorites}
                grid={true}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Product product={item} isFavoritePage={true} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Favorites;
