import { useRecordContext, useGetOne, EmailField } from "react-admin";
import { Card, CardContent, Typography, CircularProgress, Alert, Chip, Box } from "@mui/material";

export const ManagerCard = () => {
  const record = useRecordContext();

  if (!record) return null;

  const { data: manager, isPending, error } = useGetOne(
    "employees",
    { id: record.managerId },
    { enabled: !!record.managerId }
  );

  return (
    <Card sx={{ mt: 2, borderRadius: 3, border: "1px solid #22252b", backgroundColor: "#16181d", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Typography variant="body2" sx={{ fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em", color: "#888890", mb: 1.5 }}>
          Manager
        </Typography>
        {isPending ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={16} sx={{ color: "#2aa8a8" }} />
            <Typography variant="body2" sx={{ color: "#888890" }}>Chargement...</Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ borderRadius: 2, py: 0, backgroundColor: "rgba(224,72,72,0.1)", color: "#e04848" }}>Erreur de chargement</Alert>
        ) : !manager ? (
          <Alert severity="warning" sx={{ borderRadius: 2, py: 0, backgroundColor: "rgba(196,163,90,0.1)", color: "#c4a35a" }}>Aucun manager trouvé</Alert>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: "#e4e4e0" }}>
              {manager.firstname} {manager.lastname}
            </Typography>
            <Typography variant="body2" sx={{ color: "#888890", mb: 1 }}>
              {manager.department}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "#888890" }}>
              {manager.email}
            </Typography>
            <Chip
              label={manager.active ? "Actif" : "Inactif"}
              size="small"
              sx={{
                borderRadius: 1.5,
                backgroundColor: manager.active ? "rgba(74,184,106,0.15)" : "rgba(224,72,72,0.15)",
                color: manager.active ? "#4ab86a" : "#e04848",
                fontWeight: 500,
                fontSize: "0.75rem",
                border: `1px solid ${manager.active ? "rgba(74,184,106,0.3)" : "rgba(224,72,72,0.3)"}`,
              }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
