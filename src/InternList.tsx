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
  DeleteButton,
  CreateButton,
  useCreate,
  useNotify,
  useRefresh,
  TopToolbar,
} from "react-admin";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const internFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
  <BooleanInput source="isRemunerate" label="Rémunéré" />,
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
          backgroundColor: "#16181d",
          border: "1px solid #22252b",
          borderRadius: 3,
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle sx={{ color: "#e4e4e0", fontWeight: 600 }}>Ajouter stagiaire rapide</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2, backgroundColor: "rgba(224,72,72,0.1)", color: "#e04848", borderRadius: 2 }}>
            {error}
          </Alert>
        )}
        <MuiTextField
          label="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
          required
          InputLabelProps={{ sx: { color: "#888890" } }}
          InputProps={{ sx: { color: "#e4e4e0" } }}
        />
        <MuiTextField
          label="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
          required
          InputLabelProps={{ sx: { color: "#888890" } }}
          InputProps={{ sx: { color: "#e4e4e0" } }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel sx={{ color: "#888890" }}>Manager *</InputLabel>
          <Select
            value={managerId}
            label="Manager *"
            onChange={(e) => setManagerId(e.target.value)}
            required
            sx={{ color: "#e4e4e0" }}
          >
            <MenuItem value={1} sx={{ color: "#e4e4e0" }}>Alice Martin (Informatique)</MenuItem>
            <MenuItem value={2} sx={{ color: "#e4e4e0" }}>Bob Dupont (Marketing)</MenuItem>
            <MenuItem value={4} sx={{ color: "#e4e4e0" }}>David Leroy (Finance)</MenuItem>
            <MenuItem value={5} sx={{ color: "#e4e4e0" }}>Emma Petit (Informatique)</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #22252b", px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ color: "#888890" }}>Annuler</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isPending}>
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
      sx={{ mr: 1, borderRadius: 2, textTransform: "none" }}
    >
      Ajout rapide
    </Button>
    <CreateButton sx={{ borderRadius: 2, textTransform: "none" }} />
  </TopToolbar>
);

export const InternList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <List
        filters={internFilters}
        perPage={5}
        sort={{ field: "id", order: "ASC" }}
        title="Liste des Stagiaires"
        actions={<PostActions onQuickCreate={() => setDialogOpen(true)} />}
      >
        <Datagrid rowClick="show">
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
          />
          <BooleanField source="isRemunerate" label="Rémunéré" />
          <EditButton label="Modifier" />
          <DeleteButton label="Supprimer" />
        </Datagrid>
      </List>
      <QuickCreateDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};
