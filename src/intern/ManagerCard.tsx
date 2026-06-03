import { useRecordContext, useGetOne } from "react-admin";
import { Typography, CircularProgress, Alert, Chip, Box, Avatar } from "@mui/material";

export const ManagerCard = () => {
  const record = useRecordContext();
  if (!record) return null;

  const { data: manager, isPending, error } = useGetOne(
    "employees",
    { id: record.managerId },
    { enabled: !!record.managerId }
  );

  if (isPending) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CircularProgress size={14} sx={{ color: "#2aa8a8" }} />
        <Typography variant="body2" sx={{ color: "#7a7a82", fontSize: "0.8rem" }}>Chargement...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ borderRadius: 1.5, backgroundColor: "rgba(224,72,72,0.1)", color: "#e04848", py: 0, fontSize: "0.8rem" }}>
        Erreur de chargement
      </Alert>
    );
  }

  if (!manager) {
    return (
      <Alert severity="warning" sx={{ borderRadius: 1.5, backgroundColor: "rgba(196,163,90,0.1)", color: "#c4a35a", py: 0, fontSize: "0.8rem" }}>
        Aucun manager trouvé
      </Alert>
    );
  }

  const initials = `${manager.firstname?.[0] ?? ""}${manager.lastname?.[0] ?? ""}`.toUpperCase();

  return (
    <Box sx={{ display: "flex", gap: 2.5 }}>
      <Avatar
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          backgroundColor: "rgba(42,168,168,0.1)",
          color: "#2aa8a8",
          fontSize: "1.1rem",
          fontWeight: 700,
          border: "1px solid rgba(42,168,168,0.15)",
          flexShrink: 0,
        }}
      >
        {initials}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: "#e8e8e4", mb: 0.25 }}>
          {manager.firstname} {manager.lastname}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75, flexWrap: "wrap" }}>
          <Typography variant="body2" sx={{ color: "#7a7a82", fontSize: "0.8rem" }}>
            {manager.department}
          </Typography>
          <Box sx={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "#5a5a62" }} />
          <Typography variant="body2" sx={{ color: "#7a7a82", fontSize: "0.8rem" }}>
            {manager.email}
          </Typography>
        </Box>
        <Chip
          label={manager.active ? "Actif" : "Inactif"}
          size="small"
          sx={{
            borderRadius: 1.5,
            backgroundColor: manager.active ? "rgba(74,184,106,0.12)" : "rgba(224,72,72,0.12)",
            color: manager.active ? "#4ab86a" : "#e04848",
            fontWeight: 500,
            fontSize: "0.65rem",
            height: 22,
            border: `1px solid ${manager.active ? "rgba(74,184,106,0.25)" : "rgba(224,72,72,0.25)"}`,
          }}
        />
      </Box>
    </Box>
  );
};
