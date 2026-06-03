
import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  NumberField,
  BooleanField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";
import { InternsByManager } from "./InternsByManager";
import { DepartmentStats } from "./DepartmentStats";

const EmployeeShowActions = () => (
  <TopToolbar sx={{ gap: 1 }}>
    <ListButton label="Retour à la liste" sx={{ borderRadius: 2, textTransform: "none" }} />
    <EditButton label="Modifier" sx={{ borderRadius: 2, textTransform: "none" }} />
  </TopToolbar>
);

export const EmployeeShow = () => (
  <Show title="Fiche employé" actions={<EmployeeShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <EmailField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="active" label="Actif" />
      <InternsByManager />
      <DepartmentStats />
    </SimpleShowLayout>
  </Show>
);
