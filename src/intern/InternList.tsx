import { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  NumberField,
  BooleanField,
  ReferenceField,
  SearchInput,
  SelectInput,
  BooleanInput,
  EditButton,
  CreateButton,
  useCreate,
  useNotify,
  useRefresh,
  useRecordContext,
  TopToolbar,
} from "react-admin";
import { ConfirmDeleteButton } from "../ConfirmDeleteDialog";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const internFilters = [
  <SearchInput source="q" alwaysOn sx={{ "& .MuiInputBase-root": { backgroundColor: "#121418" } }} />,
  <SelectInput
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
    sx={{ "& .MuiInputBase-root": { backgroundColor: "#121418" } }}
  />,
  <BooleanInput source="isRemunerate" label="Rémunéré" sx={{ "& .MuiInputBase-root": { backgroundColor: "#121418" } }} />,
];

const QuickCreateDialog = ({ open, onClose }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [managerId, setManagerId] = useState("");
  const [error, setError] = useState("");
  const [create, { isPending }] = useCreate();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleSubmit = async () => {
    if (!firstname || !lastname || !managerId) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    try {
      await create(
        "interns",
        {
          data: {
            firstname,
            lastname,
            managerId: parseInt(managerId, 10),
            email: `${firstname.toLowerCase()}.${lastname.toLowerCase()}@company.com`,
            department: "Informatique",
            remuneration: 0,
            isRemunerate: false,
          },
        },
        {
          onSuccess: () => {
            notify("Stagiaire créé avec succès", { type: "success" });
            refresh();
            onClose();
          },
          onError: (err) => {
            setError("Erreur lors de la création : " + (err.message || ""));
          },
        }
      );
    } catch (err) {
      setError("Erreur lors de la création");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#121418",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 3,
          backgroundImage: "none",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        },
      }}
    >
      <DialogTitle sx={{ color: "#e8e8e4", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
        Ajouter stagiaire rapide
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2, backgroundColor: "rgba(224,72,72,0.1)", color: "#e04848", borderRadius: 1.5, fontSize: "0.8rem" }}>
            {error}
          </Alert>
        )}
        <MuiTextField
          label="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          fullWidth
          sx={{ mt: 1.5 }}
          required
          InputLabelProps={{ sx: { color: "#7a7a82", fontSize: "0.85rem" } }}
          InputProps={{ sx: { color: "#e8e8e4", backgroundColor: "#0f1116", borderRadius: 1.5 } }}
        />
        <MuiTextField
          label="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
          required
          InputLabelProps={{ sx: { color: "#7a7a82", fontSize: "0.85rem" } }}
          InputProps={{ sx: { color: "#e8e8e4", backgroundColor: "#0f1116", borderRadius: 1.5 } }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel sx={{ color: "#7a7a82", fontSize: "0.85rem" }}>Manager *</InputLabel>
          <Select
            value={managerId}
            label="Manager *"
            onChange={(e) => setManagerId(e.target.value)}
            required
            sx={{ color: "#e8e8e4", backgroundColor: "#0f1116", borderRadius: 1.5 }}
          >
            <MenuItem value={1} sx={{ color: "#e8e8e4" }}>Alice Martin (Informatique)</MenuItem>
            <MenuItem value={2} sx={{ color: "#e8e8e4" }}>Bob Dupont (Marketing)</MenuItem>
            <MenuItem value={4} sx={{ color: "#e8e8e4" }}>David Leroy (Finance)</MenuItem>
            <MenuItem value={5} sx={{ color: "#e8e8e4" }}>Emma Petit (Informatique)</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid rgba(255,255,255,0.04)", px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ color: "#7a7a82", textTransform: "none", fontWeight: 500 }}>
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isPending}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
          }}
        >
          {isPending ? "Création..." : "Créer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const PostActions = ({ onQuickCreate, ...props }) => (
  <TopToolbar>
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onQuickCreate}
      sx={{
        mr: 1,
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.8rem",
        backgroundColor: "#121418",
        color: "#2aa8a8",
        border: "1px solid rgba(42,168,168,0.3)",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "rgba(42,168,168,0.08)",
          borderColor: "#2aa8a8",
          boxShadow: "none",
        },
      }}
    >
      Ajout rapide
    </Button>
    <CreateButton
      sx={{
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.8rem",
      }}
    />
  </TopToolbar>
);

const DeleteAction = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <ConfirmDeleteButton id={record.id} resource="interns" />;
};

export const InternList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 3,
            height: 20,
            borderRadius: 1.5,
            background: "linear-gradient(180deg, #c4a35a, #2aa8a8)",
          }}
        />
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#7a7a82",
              fontSize: "0.7rem",
              mb: 0.25,
            }}
          >
            Ressources
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.35rem",
              letterSpacing: "-0.03em",
              color: "#e8e8e4",
            }}
          >
            Stagiaires
          </Typography>
        </Box>
      </Box>

      <List
        filters={internFilters}
        perPage={5}
        sort={{ field: "id", order: "ASC" }}
        title=" "
        actions={<PostActions onQuickCreate={() => setDialogOpen(true)} />}
      >
        <Datagrid
          rowClick="show"
          bulkActionButtons={false}
          sx={{
            "& .RaDatagrid-headerCell": {
              backgroundColor: "#0f1116",
              fontWeight: 600,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#7a7a82",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              py: 1.5,
            },
            "& .RaDatagrid-rowCell": {
              borderBottom: "1px solid rgba(255,255,255,0.03)",
              py: 1.25,
              color: "#e4e4e0",
              fontSize: "0.85rem",
            },
            "& .RaDatagrid-row": {
              transition: "background-color 0.12s ease",
            },
            "& .RaDatagrid-row:nth-of-type(even)": {
              backgroundColor: "rgba(255,255,255,0.012)",
            },
            "& .RaDatagrid-row:hover": {
              backgroundColor: "rgba(42,168,168,0.04) !important",
            },
          }}
        >
          <TextField source="firstname" label="Prénom" />
          <TextField source="lastname" label="Nom" />
          <EmailField source="email" label="Email" />
          <TextField source="department" label="Département" />
          <ReferenceField source="managerId" reference="employees" label="Manager">
            <TextField source="firstname" />
            <span> </span>
            <TextField source="lastname" />
          </ReferenceField>
          <NumberField
            source="remuneration"
            label="Rémunération"
            options={{ style: "currency", currency: "EUR" }}
            sx={{ color: "#c4a35a", fontWeight: 500 }}
          />
          <BooleanField source="isRemunerate" label="Rémunéré" />
          <EditButton
            icon={<EditIcon />}
            label="Modifier"
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
                backgroundColor: "rgba(42,168,168,0.08)",
                borderColor: "rgba(42,168,168,0.3)",
                color: "#2aa8a8",
              },
            }}
          />
          <DeleteAction />
        </Datagrid>
      </List>
      <QuickCreateDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
};
