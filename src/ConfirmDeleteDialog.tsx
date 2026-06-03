import { useState } from "react";
import { useDelete, useRefresh, useNotify } from "react-admin";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const ConfirmDeleteButton = ({ id, resource }) => {
  const [open, setOpen] = useState(false);
  const [deleteOne, { isPending }] = useDelete();
  const refresh = useRefresh();
  const notify = useNotify();

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setOpen(false);
  };

  const handleConfirm = async (e) => {
    e.stopPropagation();
    try {
      await deleteOne(resource, { id, previousData: undefined }, {
        onSuccess: () => {
          notify("Élément supprimé", { type: "success" });
          refresh();
        },
        onError: (err) => {
          notify("Erreur lors de la suppression", { type: "error" });
        },
      });
    } catch {
      notify("Erreur lors de la suppression", { type: "error" });
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        size="small"
        onClick={handleClickOpen}
        sx={{
          borderRadius: 1.5,
          color: "#7a7a82",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.8rem",
          gap: 0.5,
          px: 1,
          py: 0.5,
          backgroundColor: "transparent",
          border: "1px solid rgba(255,255,255,0.06)",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(224,72,72,0.08)",
            borderColor: "rgba(224,72,72,0.3)",
            color: "#e04848",
          },
        }}
      >
        <DeleteIcon sx={{ fontSize: 18 }} />
        Supprimer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        TransitionProps={{
          onEnter: (node) => {
            node.style.opacity = "0";
            node.style.transform = "scale(0.95)";
            requestAnimationFrame(() => {
              node.style.transition = "all 0.2s cubic-bezier(0.23, 1, 0.32, 1)";
              node.style.opacity = "1";
              node.style.transform = "scale(1)";
            });
          },
          onExiting: (node) => {
            node.style.opacity = "0";
            node.style.transform = "scale(0.95)";
          },
        }}
      >
        <DialogTitle>
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#7a7a82", fontSize: "0.85rem" }}>
            Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "#7a7a82",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={isPending}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              backgroundColor: "#e04848",
              "&:hover": {
                backgroundColor: "#c43a3a",
              },
            }}
          >
            {isPending ? (
              <CircularProgress size={16} sx={{ color: "white" }} />
            ) : (
              "Supprimer"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
