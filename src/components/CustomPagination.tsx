import React from "react";
import { Pagination, Box } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default CustomPagination;
