import { useRecordContext, useGetList } from "react-admin";
import { Card, CardContent, Typography, CircularProgress, Alert, Box } from "@mui/material";

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
    <Card sx={{ mt: 2, borderRadius: 3, border: "1px solid #22252b", backgroundColor: "#16181d", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Typography variant="body2" sx={{ fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em", color: "#888890", mb: 1.5 }}>
          Departement : {record.department}
        </Typography>
        {isPending ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={16} sx={{ color: "#2aa8a8" }} />
            <Typography variant="body2" sx={{ color: "#888890" }}>Chargement...</Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ borderRadius: 2, backgroundColor: "rgba(224,72,72,0.1)", color: "#e04848" }}>Erreur de chargement</Alert>
        ) : (
          <>
            <Typography sx={{ fontSize: "2.5rem", fontWeight: 600, letterSpacing: "-0.02em", color: "#2aa8a8", lineHeight: 1 }}>
              {total ?? 0}
            </Typography>
            <Typography variant="body2" sx={{ color: "#888890", mt: 0.5 }}>
              collegue{(total ?? 0) > 1 ? "s" : ""} actif{(total ?? 0) > 1 ? "s" : ""} dans ce departement
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};
