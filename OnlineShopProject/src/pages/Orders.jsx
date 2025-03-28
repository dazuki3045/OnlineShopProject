import { useAuthStore } from "../features/store";
import { List, Card } from "antd";

const Orders = () => {
    const { getUserOrders } = useAuthStore();
    const orders = getUserOrders();

    return (
        <div>
            <h2>Ваши заказы</h2>
            <List
                dataSource={orders}
                renderItem={(order, index) => (
                    <List.Item key={index}>
                        <Card title={`Заказ #${index + 1}`}>
                            <p>Адрес: {order.address}</p>
                            <p>Телефон: {order.phone}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Orders;
