import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsBySubcategory, BRANDS } from "../../config/ApiConfig";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./Style.css";
import Header from "../../Components/Header/Header";


const SubCategoryPage = () => {
    const { subCategoryId } = useParams(); // Lấy subCategoryId từ URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = getProductsBySubcategory(subCategoryId);
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`Lỗi HTTP! Status: ${response.status}`);

                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm theo danh mục con:", error);
                setLoading(false);
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await fetch(BRANDS);
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error("Lỗi khi lấy thương hiệu:", error);
            }
        };

        fetchProducts();
        fetchBrands();
    }, [subCategoryId]);
     // Tính toán số trang
     const totalPages = Math.ceil(products.length / productsPerPage);
     const indexOfLastProduct = currentPage * productsPerPage;
     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
     const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

     return (
        <div className="category-page">
            <Header />
            <div className="main-content">
                {/* Sidebar */}
                <aside className="sidebar">
                    <h2>Filters</h2>
                    <p><a href="#" className="category-link">Danh mục cha - Tên danh mục</a></p>
                    <p><a href="#" className="subcategory-link">Danh mục con 1</a></p>
                    <p><a href="#" className="subcategory-link">Danh mục con 2</a></p>
                    <p><a href="#" className="subcategory-link">Danh mục con 3</a></p>
                    <p>Price Range</p>
                    <input type="range" min="0" max="1000" />
                    <p>Thương hiệu</p>
                    <label><input type="checkbox" /> Thương hiệu 1</label>
                    <label><input type="checkbox" /> Thương hiệu 2</label>
                    <label><input type="checkbox" /> Thương hiệu 3</label>
                    <button className="apply-filter">Apply</button>
                </aside>
    
                {/* Danh sách sản phẩm + Pagination */}
                <section className="products-wrapper">
                    <div className="products-container">
                        {loading ? (
                            <p>Loading...</p>
                        ) : products.length > 0 ? (
                            products.map((product) => <ProductCard key={product._id} product={product} />)
                        ) : (
                            <p>Không có sản phẩm nào.</p>
                        )}
                    </div>
    
                    {/* Pagination nằm trong .products-wrapper để luôn ở dưới */}
                    <div className="pagination-container">
                        <div className="pagination">
                            <button 
                                disabled={currentPage === 1} 
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                Previous
                            </button>
    
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button 
                                    key={index + 1} 
                                    className={currentPage === index + 1 ? "active" : ""}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
    
                            <button 
                                disabled={currentPage === totalPages} 
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
    
};

export default SubCategoryPage;
