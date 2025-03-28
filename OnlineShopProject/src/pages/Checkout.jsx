import { Button, Input } from "antd";
import { useAuthStore } from "../features/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
    const { user, addOrder } = useAuthStore();
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleOrder = async () => {
        if (!address || !phone) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }

        try {
            const orderData = {
                userId: user.id,
                address,
                phone,
                status: "pending",
                orderId: Date.now(),
            };

            await axios.post("https://dummyjson.com/orders", orderData);

            addOrder(orderData);

            navigate("/order-confirmation");
        } catch (error) {
            setError("Не удалось оформить заказ, попробуйте позже.");
        }
    };

    return (
        <div>
            <h2>Оформление заказа</h2>
            <Input
                placeholder="Адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Input
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button onClick={handleOrder}>Оформить заказ</Button>
        </div>
    );
};

export default Checkout;
