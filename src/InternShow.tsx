
import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  NumberField,
  BooleanField,
  ReferenceField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";
import { ManagerCard } from "./ManagerCard";

const InternShowActions = () => (
  <TopToolbar sx={{ gap: 1 }}>
    <ListButton label="Retour à la liste" sx={{ borderRadius: 2, textTransform: "none" }} />
    <EditButton label="Modifier" sx={{ borderRadius: 2, textTransform: "none" }} />
  </TopToolbar>
);

export const InternShow = () => (
  <Show title="Fiche stagiaire" actions={<InternShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <EmailField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <ReferenceField source="managerId" reference="employees" label="Manager" link="show">
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
      <ManagerCard />
    </SimpleShowLayout>
  </Show>
);
