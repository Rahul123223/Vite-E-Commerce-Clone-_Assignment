import { Box, Chip } from "@mui/material";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryClick,
}: CategoryFilterProps) => {
  return (
    <Box
      sx={{
        marginBottom: 2,
        marginTop: 2,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          clickable
          onClick={() => onCategoryClick(category)}
          sx={{
            marginRight: 1,
            marginBottom: 1,
            textDecoration: selectedCategory === category ? "underline" : "none",
            backgroundColor: "transparent", 
            "&:hover": {
              textDecoration: "underline", 
            },
            fontWeight: selectedCategory === category ? "bold" : "normal", 
          }}
        />
      ))}
    </Box>
  );
};

export default CategoryFilter;
