import {
  List,
  Datagrid,
  TextField,
  EmailField,
  NumberField,
  BooleanField,
  SearchInput,
  SelectInput,
  EditButton,
  useRecordContext,
} from "react-admin";
import { Box, Typography, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { QuickStatusToggle } from "./QuickStatusToggle";
import { ConfirmDeleteButton } from "./ConfirmDeleteDialog";

const DeleteAction = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <ConfirmDeleteButton id={record.id} resource="employees" />;
};

const employeeFilters = [
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
];

export const EmployeeList = () => (
  <Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
      <Box
        sx={{
          width: 3,
          height: 20,
          borderRadius: 1.5,
          background: "linear-gradient(180deg, #2aa8a8, #4ab86a)",
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
          Employés
        </Typography>
      </Box>
    </Box>

    <List
      filters={employeeFilters}
      perPage={10}
      sort={{ field: "id", order: "ASC" }}
      title=" "
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
        <NumberField
          source="salary"
          label="Salaire"
          options={{ style: "currency", currency: "EUR" }}
          sx={{ color: "#c4a35a", fontWeight: 500 }}
        />
        <BooleanField source="active" label="Actif" />
        <QuickStatusToggle />
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
  </Box>
);
