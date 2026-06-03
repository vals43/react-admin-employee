import { useRecordContext, Show, TextField, ReferenceField, TopToolbar, ListButton, EditButton } from "react-admin";
import { Card, CardContent, Typography, Box, Avatar, Chip, Grid } from "@mui/material";
import { ManagerCard } from "./ManagerCard";

const InternShowActions = () => (
  <TopToolbar sx={{ gap: 1 }}>
    <ListButton label="Retour" sx={{ borderRadius: 2, textTransform: "none" }} />
    <EditButton label="Modifier" sx={{ borderRadius: 2, textTransform: "none" }} />
  </TopToolbar>
);

const ProfileHero = ({ record }) => {
  const initials = `${record.firstname?.[0] ?? ""}${record.lastname?.[0] ?? ""}`.toUpperCase();

  return (
    <Box
      sx={{
        p: "1px",
        borderRadius: 3.5,
        background: "linear-gradient(135deg, rgba(196,163,90,0.3), rgba(196,163,90,0.05))",
        mb: 3,
      }}
    >
      <Card sx={{ borderRadius: 3, backgroundColor: "#121418", border: "none" }}>
        <CardContent sx={{ p: 3.5, "&:last-child": { pb: 3.5 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2.5,
                backgroundColor: "rgba(196,163,90,0.12)",
                color: "#c4a35a",
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                border: "1px solid rgba(196,163,90,0.2)",
              }}
            >
              {initials}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#e8e8e4", mb: 0.5 }}>
                {record.firstname} {record.lastname}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                <Chip
                  label={record.department}
                  size="small"
                  sx={{
                    borderRadius: 1.5,
                    backgroundColor: "rgba(42,168,168,0.1)",
                    color: "#2aa8a8",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    border: "1px solid rgba(42,168,168,0.2)",
                  }}
                />
                <Chip
                  label={record.isRemunerate ? "Rémunéré" : "Non rémunéré"}
                  size="small"
                  sx={{
                    borderRadius: 1.5,
                    backgroundColor: record.isRemunerate ? "rgba(74,184,106,0.12)" : "rgba(224,72,72,0.12)",
                    color: record.isRemunerate ? "#4ab86a" : "#e04848",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    border: `1px solid ${record.isRemunerate ? "rgba(74,184,106,0.25)" : "rgba(224,72,72,0.25)"}`,
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ color: "#7a7a82", fontSize: "0.7rem", mb: 0.25 }}>
                Rémunération
              </Typography>
              <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#c4a35a" }}>
                {record.isRemunerate ? new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(record.remuneration) : "—"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.25, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
    <Typography variant="body2" sx={{ color: "#7a7a82", fontSize: "0.8rem" }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color: "#e8e8e4", fontWeight: 500, fontSize: "0.85rem" }}>
      {value}
    </Typography>
  </Box>
);

const InfoCard = ({ children }) => (
  <Box
    sx={{
      p: "1px",
      borderRadius: 3.5,
      background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
      height: "100%",
    }}
  >
    <Card sx={{ borderRadius: 3, backgroundColor: "#121418", border: "none", height: "100%" }}>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        {children}
      </CardContent>
    </Card>
  </Box>
);

const SectionTitle = ({ children }) => (
  <Typography
    variant="body2"
    sx={{
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "#7a7a82",
      fontSize: "0.7rem",
      mb: 2,
    }}
  >
    {children}
  </Typography>
);

const InternShowLayout = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Box>
      <ProfileHero record={record} />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <InfoCard>
            <SectionTitle>Informations</SectionTitle>
            <InfoRow label="ID" value={`#${record.id}`} />
            <InfoRow label="Email" value={record.email} />
            <InfoRow label="Département" value={record.department} />
            <InfoRow label="Rémunéré" value={record.isRemunerate ? "Oui" : "Non"} />
            {record.isRemunerate && (
              <InfoRow
                label="Montant"
                value={new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(record.remuneration)}
              />
            )}
            <InfoRow
              label="Statut"
              value={
                <Box component="span" sx={{ color: record.isRemunerate ? "#4ab86a" : "#e04848" }}>
                  {record.isRemunerate ? "Rémunéré" : "Non rémunéré"}
                </Box>
              }
            />
          </InfoCard>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <InfoCard>
            <SectionTitle>Manager</SectionTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 3, height: 24, borderRadius: 1.5, backgroundColor: "#c4a35a" }} />
              <ReferenceField source="managerId" reference="employees" label="Manager" link="show">
                <TextField source="firstname" />
                <span> </span>
                <TextField source="lastname" />
              </ReferenceField>
            </Box>
            <ManagerCard />
          </InfoCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export const InternShow = () => (
  <Show actions={<InternShowActions />}>
    <InternShowLayout />
  </Show>
);
