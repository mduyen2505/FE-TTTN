import React, { useState, useEffect } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { addToCart } from "../../services/CartService";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../../services/WishlistService";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const rating = product.rating || 0;
  const stars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? solidStar : regularStar
  );

  const isLoggedIn = !!localStorage.getItem("token");
  const [isFavorite, setIsFavorite] = useState(false);

 
  useEffect(() => {
    if (!isLoggedIn) {
      setIsFavorite(false);
      return;
    }

    const fetchWishlist = async () => {
      const wishlist = await getWishlist();
      setIsFavorite(wishlist.includes(product._id));
      localStorage.setItem("wishlist", JSON.stringify(wishlist)); 
    };

    fetchWishlist();
  }, [product._id, isLoggedIn]);

  
  const handleWishlistToggle = async (e) => {
    e.stopPropagation(); 

    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thêm vào yêu thích!");
      return;
    }

    setIsFavorite(!isFavorite); 

    if (!isFavorite) {
      await addToWishlist(product._id);
    } else {
      await removeFromWishlist(product._id);
    }
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
  {product.discount !== undefined && product.discount !== null && product.discount > 0 && (
    <span className="discount-tag">-{product.discount}%</span>
)}

      

     
      <div
        className="favorite-icon"
        role="button"
        onClick={handleWishlistToggle}
      >
        {isFavorite ? (
          <FavoriteIcon style={{ color: "red" }} />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </div>

      <img
        src={
          product.image.startsWith("http")
            ? product.image
            : `http://localhost:3000/images/${product.image}`
        }
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h5 className="product-name">{product.name}</h5>
        <div className="rating">
          {stars.map((star, index) => (
            <FontAwesomeIcon key={index} icon={star} className="star-icon" />
          ))}
          <span className="rating-count">({product.reviewCount || 0})</span>
        </div>

       
        <div className="price-container">
        {product.discount !== undefined && product.discount !== null && product.discount > 0 ? (
    <>
      {product.price > 0 && (
        <span className="original-price">{product.price?.toLocaleString()}₫</span>
      )}
      <span className="discounted-price">{product.promotionPrice?.toLocaleString()}₫</span>
    </>
  ) : (
    <span className="discounted-price">{product.price?.toLocaleString()}₫</span>
  )}
</div>


        <button className="add-to-bag" onClick={() => addToCart(product._id)}>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
