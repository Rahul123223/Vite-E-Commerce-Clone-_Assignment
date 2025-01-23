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
          color={selectedCategory === category ? "primary" : "default"}
          onClick={() => onCategoryClick(category)}
          sx={{ marginRight: 1, marginBottom: 1 }}
        />
      ))}
    </Box>
  );
};

export default CategoryFilter;
