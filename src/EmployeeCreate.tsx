
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  required,
  minValue,
  email,
} from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

export const EmployeeCreate = () => (
  <Create title="Créer un employé" redirect="list">
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" validate={[required("Le prénom est obligatoire")]} fullWidth />
      <TextInput source="lastname" label="Nom" validate={[required("Le nom est obligatoire")]} fullWidth />
      <TextInput source="email" label="Email" validate={[required("L'email est obligatoire"), email("Format d'email invalide")]} fullWidth />
      <SelectInput source="department" label="Département" choices={departmentChoices} validate={[required("Le département est obligatoire")]} fullWidth />
      <NumberInput source="salary" label="Salaire (€)" validate={[required("Le salaire est obligatoire"), minValue(1500, "Le salaire minimum est 1 500 €")]} fullWidth />
      <BooleanInput source="active" label="Employé actif" defaultValue={true} />
    </SimpleForm>
  </Create>
);
