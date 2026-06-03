import { useRecordContext, useUpdate } from "react-admin";
import { Button, CircularProgress } from "@mui/material";

export const QuickStatusToggle = () => {
  const record = useRecordContext();
  const [update, { isPending }] = useUpdate();

  if (!record) return null;

  const handleToggle = () => {
    update(
      "employees",
      {
        id: record.id,
        data: { active: !record.active },
        previousData: record,
      },
      {
        onError: (error) => {
          console.error("Erreur lors de la mise à jour", error);
        },
      }
    );
  };

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleToggle}
      disabled={isPending}
      sx={{
        minWidth: 100,
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 500,
        fontSize: "0.75rem",
        backgroundColor: record.active ? "rgba(224,72,72,0.15)" : "rgba(74,184,106,0.15)",
        color: record.active ? "#e04848" : "#4ab86a",
        border: `1px solid ${record.active ? "rgba(224,72,72,0.3)" : "rgba(74,184,106,0.3)"}`,
        boxShadow: "none",
        "&:hover": {
          backgroundColor: record.active ? "rgba(224,72,72,0.25)" : "rgba(74,184,106,0.25)",
          boxShadow: "none",
        },
        "&:disabled": {
          opacity: 0.7,
        },
      }}
    >
      {isPending ? (
        <CircularProgress size={12} sx={{ color: "inherit" }} />
      ) : record.active ? (
        "Désactiver"
      ) : (
        "Activer"
      )}
    </Button>
  );
};
