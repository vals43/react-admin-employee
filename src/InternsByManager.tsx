import { useRecordContext, useGetList, Link } from "react-admin";
import {
  Card,
  CardContent,
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
    <Card sx={{ mt: 2, borderRadius: 3, border: "1px solid #22252b", backgroundColor: "#16181d", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Typography variant="body2" sx={{ fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em", color: "#888890", mb: 1.5 }}>
          Stagiaires encadrés <Box component="span" sx={{ color: "#2aa8a8", fontWeight: 600 }}>({total ?? 0})</Box>
        </Typography>
        {isPending ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={16} sx={{ color: "#2aa8a8" }} />
            <Typography variant="body2" sx={{ color: "#888890" }}>Chargement...</Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ borderRadius: 2, backgroundColor: "rgba(224,72,72,0.1)", color: "#e04848" }}>Erreur de chargement</Alert>
        ) : interns && interns.length > 0 ? (
          <MuiList dense disablePadding>
            {interns.map((intern, idx) => (
              <Box key={intern.id}>
                {idx > 0 && <Divider sx={{ my: 0.5, borderColor: "#22252b" }} />}
                <ListItem disablePadding sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <Link to={`/interns/${intern.id}/show`} style={{ color: "#2aa8a8", fontWeight: 500, textDecoration: "none" }}>
                        {intern.firstname} {intern.lastname}
                      </Link>
                    }
                    secondary={`${intern.department} · ${intern.isRemunerate ? `${intern.remuneration} €` : "Non rémunéré"}`}
                    secondaryTypographyProps={{ variant: "body2", sx: { color: "#888890" } }}
                  />
                </ListItem>
              </Box>
            ))}
          </MuiList>
        ) : (
          <Typography variant="body2" sx={{ color: "#5a5a62", fontStyle: "italic" }}>
            Aucun stagiaire encadré
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
