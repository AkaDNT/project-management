// ClassName dùng Tailwind cho khung DataGrid
// LƯU Ý: sửa dark:bg[...] đúng cú pháp arbitrary value
export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:bg-[color:var(--color-dark-secondary)] dark:text-gray-200";

// Toàn bộ style MUI theo isDarkMode để đảm bảo nền không bị trắng
export const dataGridSxStyles = (isDarkMode: boolean) => {
  const bg = isDarkMode ? "#121416" : "#ffffff";
  const surface = isDarkMode ? "#1d1f21" : "#ffffff";
  const border = isDarkMode ? "#2d3135" : "#e5e7eb";
  const text = isDarkMode ? "#e5e7eb" : "#111827";
  const textSubtle = isDarkMode ? "#4b5563" : "#a3a3a3";

  return {
    // nền tổng thể của grid
    backgroundColor: bg,
    color: text,

    // phần body scroll (rất quan trọng để tránh nền trắng)
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: bg,
    },

    //icon

    "& .MuiSvgIcon-root": {
      color: text,
    },
    // Header
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#e5e7eb" : ""}`,
      '& [role="row"] > *': {
        backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
        borderColor: `${isDarkMode ? "#2d3135" : ""}`,
      },
    },

    // Ô & hàng
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${border}`,
    },

    "& .MuiDataGrid-row:hover": {
      borderBottom: `1px solid ${border}`,
      backgroundColor: textSubtle,
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: border,
    },

    // Footer / Pagination
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: surface,
      color: textSubtle,
      borderTop: `1px solid ${border}`,
    },

    // IconButton (SỬA đúng selector: MuiIconButton-root)
    "& .MuiIconButton-root": {
      color: textSubtle,
    },

    // Bảng chọn trang / text phụ
    "& .MuiTablePagination-root": {
      color: textSubtle,
    },
    "& .MuiTablePagination-selectIcon": {
      color: textSubtle,
    },

    // Toolbar (nếu có)
    "& .MuiDataGrid-toolbarContainer": {
      backgroundColor: surface,
      borderBottom: `1px solid ${border}`,
      color: textSubtle,
    },

    // Checkbox / selection (nếu bật)
    "& .MuiDataGrid-checkboxInput": {
      color: textSubtle,
    },
    "& .Mui-selected": {
      color: textSubtle,
    },
  };
};
