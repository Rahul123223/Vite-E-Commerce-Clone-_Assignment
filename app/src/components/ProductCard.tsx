import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {products.map((item) => (
        <div
          key={item.id}
          style={{
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={
              item.image
                ? item.image
                : "https://via.placeholder.com/640x480?text=No+Image"
            }
            alt={item.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{item.title}</h3>
          <p style={{ color: "#555", fontSize: "14px" }}>{item.description}</p>
          <p style={{ fontWeight: "bold" }}>Price: ${item.price}</p>
          <p>Rating: {item.rating.rate} ({item.rating.count} reviews)</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
