import React, { useState, useEffect } from "react";
import "./Style.css";
import { FEATURED_PRODUCTS } from "../../config/ApiConfig";
import ProductCard from "../ProductCard/ProductCard";
import { getWishlist } from "../../services/WishlistService"; 

const Suggestion = () => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(FEATURED_PRODUCTS);
                const data = await response.json();
                setProducts(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
                setLoading(false);
            }
        };

        const fetchWishlist = async () => {
            const wishlistData = await getWishlist();
            setWishlist(wishlistData); 
        };

        fetchProducts();
        fetchWishlist();
    }, []);

    if (loading) {
        return <p>Đang tải sản phẩm...</p>;
    }

    return (
        <div className="product-suggestion-section">
            <div className="container">
                <div className="suggestion-header">
                    <h2 className="product-suggestion-title">Featured Products</h2>
                </div>

                <div className="product-suggestion-list">
                    {products.map((product) => (
                        <ProductCard 
                            key={product._id} 
                            product={product} 
                            initialFavorite={wishlist.includes(product._id)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Suggestion;
