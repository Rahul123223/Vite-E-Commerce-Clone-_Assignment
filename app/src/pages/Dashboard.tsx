import { useEffect, useState } from "react";
import { Box, CircularProgress, Chip } from "@mui/material";
import ProductCard from "../components/ProductCard";
import CustomPagination from "../components/CustomPagination";
import { fetchProducts } from "../services/productService";
import { fetchCategories } from "../services/categoryService";

const Dashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategoriesAndProducts = async () => {
      try {
        const [categoryData, productData] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        setCategories(categoryData);
        setProducts(productData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoriesAndProducts();
  }, []);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Chip
          label="All Categories"
          clickable
          color={!selectedCategory ? "primary" : "default"}
          onClick={() => handleCategoryClick(null)}
          sx={{ marginRight: 1, marginBottom: 1 }}
        />
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            clickable
            color={selectedCategory === category ? "primary" : "default"}
            onClick={() => handleCategoryClick(category)}
            sx={{ marginRight: 1, marginBottom: 1 }}
          />
        ))}
      </Box>

      <ProductCard products={paginatedProducts} />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default Dashboard;
