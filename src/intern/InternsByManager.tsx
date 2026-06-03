import { useRecordContext, useGetList, Link } from "react-admin";
import {
  Typography,
  List as MuiList,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Divider,
  Box,
} from "@mui/material";

export const InternsByManager = () => {
  const record = useRecordContext();

  if (!record) return null;

  const { data: interns, total, isPending, error } = useGetList(
    "interns",
    {
      filter: { managerId: record.id },
      pagination: { page: 1, perPage: 100 },
      sort: { field: "lastname", order: "ASC" },
    },
    { enabled: !!record.id }
  );

  return (
    <>
      <Typography variant="body2" sx={{ fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a7a82", fontSize: "0.7rem", mb: 2 }}>
        Stagiaires encadrés <Box component="span" sx={{ color: "#2aa8a8", fontWeight: 600 }}>({total ?? 0})</Box>
      </Typography>
      {isPending ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CircularProgress size={14} sx={{ color: "#2aa8a8" }} />
          <Typography variant="body2" sx={{ color: "#7a7a82", fontSize: "0.8rem" }}>Chargement...</Typography>
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ borderRadius: 1.5, backgroundColor: "rgba(224,72,72,0.1)", color: "#e04848", py: 0, fontSize: "0.8rem" }}>Erreur de chargement</Alert>
      ) : interns && interns.length > 0 ? (
        <MuiList dense disablePadding>
          {interns.map((intern, idx) => (
            <Box key={intern.id}>
              {idx > 0 && <Divider sx={{ my: 0.25, borderColor: "rgba(255,255,255,0.04)" }} />}
              <ListItem disablePadding sx={{ py: 0.75 }}>
                <ListItemText
                  primary={
                    <Link to={`/interns/${intern.id}/show`} style={{ color: "#2aa8a8", fontWeight: 500, fontSize: "0.85rem", textDecoration: "none" }}>
                      {intern.firstname} {intern.lastname}
                    </Link>
                  }
                  secondary={`${intern.department} · ${intern.isRemunerate ? `${intern.remuneration} €` : "Non rémunéré"}`}
                  secondaryTypographyProps={{ variant: "body2", sx: { color: "#7a7a82", fontSize: "0.75rem" } }}
                />
              </ListItem>
            </Box>
          ))}
        </MuiList>
      ) : (
        <Typography variant="body2" sx={{ color: "#5a5a62", fontStyle: "italic", fontSize: "0.8rem" }}>
          Aucun stagiaire encadré
        </Typography>
      )}
    </>
  );
};
