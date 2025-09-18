import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DeleteAccount.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header"; 
import Footer from "../../Components/Footer/Footer";
import { GET_USER_INFO, DELETE_USER_ACCOUNT } from "../../config/ApiConfig";
import AccountSidebar from "../../Components/AccountSidebar/AccountSidebar";

const DeleteAccount = () => {
  const [user, setUser] = useState({
    userId: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Bạn chưa đăng nhập!");
          setLoading(false);
          return;
        }

        const response = await axios.get(GET_USER_INFO, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.data) {
          setUser({
            userId: response.data.data._id,
            username: response.data.data.username,
            email: response.data.data.email,
            phoneNumber: response.data.data.phoneNumber,
            address: response.data.data.address || "",
          });

          localStorage.setItem("user", JSON.stringify(response.data.data));
        } else {
          setError("Không thể lấy thông tin người dùng.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        setError("Lỗi kết nối. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập lại để xóa tài khoản!");
      return;
    }

    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tài khoản của mình?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(DELETE_USER_ACCOUNT, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          alert("Tài khoản đã được xóa thành công.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login"); 
        }
      } catch (error) {
        console.error("Lỗi khi xóa tài khoản:", error);
        alert("Không thể xóa tài khoản, vui lòng thử lại!");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="account-container">
        <AccountSidebar />
        <div className="content">
          <h2 className="content-title">Thông Tin Tài Khoản</h2>

          {loading ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Họ và Tên: </label>
                  <p>{user.username}</p> 
                </div>
                <div className="form-group">
                  <label>Số điện thoại:</label>
                  <p>{user.phoneNumber}</p> 
                </div>
              </div>

              <div className="form-group">
                <label>Email:</label>
                <p>{user.email}</p> 
              </div>

              <div className="form-group">
                <label>Địa chỉ:</label>
                <p>{user.address}</p> 
              </div>

             
              <button className="delete-button" onClick={handleDeleteAccount}>
                Xóa Tài Khoản
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeleteAccount;
