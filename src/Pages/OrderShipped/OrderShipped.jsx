import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Ordershipped.css"
import AccountSidebar from "../../Components/AccountSidebar/AccountSidebar";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Ordershipped = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Bạn chưa đăng nhập!");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === "OK") {
          const ShippedOrders = response.data.data.filter(order => order.status === "Shipped");
          setOrders(ShippedOrders);
        } else {
          setError("Không thể tải danh sách đơn hàng.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        setError("Lỗi kết nối đến server.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleConfirmOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Vui lòng đăng nhập lại");
        navigate("/login");
        return;
      }
  
      const response = await axios.put(
        "http://localhost:3000/api/orders/deliver",
        { orderId },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" 
          } 
        }
      );
  
      if (response.data.status === "OK") {
        setOrders(prev => prev.filter(order => order._id !== orderId));
        alert("Xác nhận thành công!");
      }
    } catch (error) {
      console.error("Chi tiết lỗi:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn");
        localStorage.removeItem("token");
        navigate("/login");
      } else if (error.response?.data?.message) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert("Lỗi hệ thống");
      }
    }
  };
  

  return (
    <>
      <Header />
      <div className="account-container">
        <AccountSidebar />
        
        <div className="content">
          <h2 className="content-title">Đơn hàng Shipped</h2>

          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : orders.length === 0 ? (
            <p>Không có đơn hàng Shipped nào.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="orderaccount-card">
               <button
  className="orderaccount-detail-button"
  onClick={() => navigate(`/orders/${order._id}`)} 
>
  Xem chi tiết
</button>

<div className="orderaccount-header">
                  <span className="orderaccount-id">
                    Mã đơn hàng: <strong>{order._id}</strong>
                  </span>
                  <span className="orderaccount-delivery">
                    Ngày đặt hàng: {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                  </span>
                  <span className={`orderaccount-status ${order.status.toLowerCase().replace(/ /g, '-')}`}>
                    {order.status}
                  </span>
                </div>

                {order.products.map((item, idx) => (
  item.productId ? (
    <div key={idx} className="orderaccount-item">
      <img
        src={
          item.productId.image.startsWith("http")
            ? item.productId.image
            : `http://localhost:3000/images/${item.productId.image}`
        }
        alt={item.productId.name}
        className="orderaccount-item-image"
      />
      <div className="orderaccount-item-details">
        <h4 className="orderaccount-item-name">{item.productId.name}</h4>
        <p className="orderaccount-item-quantity">Số lượng: {item.quantity}</p>
        <p className="orderaccount-item-price">
          Giá: {item.productId.promotionPrice.toLocaleString()} đ
        </p>
      </div>
    </div>
  ) : (
    <div key={idx} className="orderaccount-item">
      <p className="error-message">Sản phẩm này không còn tồn tại.</p>
    </div>
  )
))}


                {/* Tổng tiền */}
                <div className="orderaccount-summary">
                  <span className="orderaccount-total">
                    Tổng tiền ({order.products.length} sản phẩm): <strong>{order.orderTotal.toLocaleString()} đ</strong>
                  </span>
                  <button
                    className="orderaccount-confirm-button"
                    onClick={() => handleConfirmOrder(order._id)}
                  >
                    Đã nhận được hàng     </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ordershipped;
