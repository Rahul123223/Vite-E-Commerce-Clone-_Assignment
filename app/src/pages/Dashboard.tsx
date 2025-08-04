import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grow,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import CustomPagination from "../components/CustomPagination";
import { fetchProducts } from "../services/productService";
import { fetchCategories } from "../services/categoryService";
import * as RadioGroup from "@radix-ui/react-radio-group"; // ✅ FIXED import



const Dashboard = ({ searchQuery }: { searchQuery: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("");

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

  // Filter products by category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "rating") return b.rating.rate - a.rating.rate;
    if (sortOption === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          // justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
        }}
      >
        <FormControl
          sx={{ minWidth: 200, animation: "fadeIn 0.5s ease-in-out" }}
        >
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort By"
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#eaeaea",
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="title">Alphabetical</MenuItem>
          </Select>
        </FormControl>
<form>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      backgroundColor: "#f9f9f9",
      padding: 2,
      borderRadius: 2,
    }}
  >
    <RadioGroup.Root
      defaultValue="default"
      aria-label="View density"
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      {[
        { value: "default", label: "Default" },
        { value: "comfortable", label: "Comfortable" },
        { value: "compact", label: "Compact" },
      ].map((option) => (
        <Box
          key={option.value}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <RadioGroup.Item
            value={option.value}
            id={option.value}
            style={{
              height: 20,
              width: 20,
              borderRadius: "50%",
              border: "2px solid #1D1D1F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RadioGroup.Indicator
              style={{
                height: 15, // Smaller inner dot
                width: 15,
                borderRadius: "50%",
                backgroundColor: "#1D1D1F",
              }}
            />
          </RadioGroup.Item>
          <label htmlFor={option.value} style={{ cursor: "pointer" }}>
            {option.label}
          </label>
        </Box>
      ))}
    </RadioGroup.Root>
  </Box>
</form>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Chip
            label="All Categories"
            clickable
            color={!selectedCategory ? "primary" : "default"}
            onClick={() => setSelectedCategory(null)}
          />
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              color={selectedCategory === category ? "primary" : "default"}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </Box>
      </Box>

      <Grow in timeout={500}>
        <Box>
          <ProductCard products={paginatedProducts} />
        </Box>
      </Grow>

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Box>
  );
};

export default Dashboard;
