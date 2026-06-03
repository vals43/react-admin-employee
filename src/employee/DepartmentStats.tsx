import { useRecordContext, useGetList } from "react-admin";
import { Typography, CircularProgress, Alert, Box } from "@mui/material";

export const DepartmentStats = () => {
  const record = useRecordContext();

  if (!record) return null;

  const { total, isPending, error } = useGetList(
    "employees",
    {
      filter: { department: record.department, active: true },
      pagination: { page: 1, perPage: 1 },
      sort: { field: "id", order: "ASC" },
    },
    { enabled: !!record.department }
  );

  return (
    <>
      <Typography variant="body2" sx={{ fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a7a82", fontSize: "0.7rem", mb: 1.5 }}>
        Departement : {record.department}
      </Typography>
      {isPending ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CircularProgress size={14} sx={{ color: "#2aa8a8" }} />
          <Typography variant="body2" sx={{ color: "#7a7a82", fontSize: "0.8rem" }}>Chargement...</Typography>
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ borderRadius: 1.5, backgroundColor: "rgba(224,72,72,0.1)", color: "#e04848", py: 0, fontSize: "0.8rem" }}>Erreur de chargement</Alert>
      ) : (
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
          <Typography sx={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2aa8a8", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            {total ?? 0}
          </Typography>
          <Typography variant="body2" sx={{ color: "#7a7a82", fontSize: "0.8rem" }}>
            collegue{(total ?? 0) > 1 ? "s" : ""} actif{(total ?? 0) > 1 ? "s" : ""} dans ce departement
          </Typography>
        </Box>
      )}
    </>
  );
};
