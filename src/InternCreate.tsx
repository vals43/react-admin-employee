
import { useWatch } from "react-hook-form";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  ReferenceInput,
  SelectInput as RaSelectInput,
  required,
  email,
} from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

const ManagerInput = () => {
  const department = useWatch({ name: "department" });
  return (
    <ReferenceInput
      source="managerId"
      reference="employees"
      label="Manager"
      filter={{ active: true, department: department || undefined }}
      sort={{ field: "firstname", order: "ASC" }}
      perPage={100}
    >
      <RaSelectInput
        optionText={(record) =>
          record ? `${record.firstname} ${record.lastname} (${record.department})` : ""
        }
        validate={[required("Le manager est obligatoire")]}
        fullWidth
      />
    </ReferenceInput>
  );
};

const RemunerationInput = () => {
  const isRemunerate = useWatch({ name: "isRemunerate" });
  return (
    <NumberInput
      source="remuneration"
      label="Rémunération (€)"
      validate={isRemunerate ? required("La rémunération est obligatoire si rémunéré") : undefined}
      fullWidth
    />
  );
};

export const InternCreate = () => (
  <Create title="Créer un stagiaire" redirect="list">
    <SimpleForm>
      <TextInput
        source="firstname"
        label="Prénom"
        validate={[required("Le prénom est obligatoire")]}
        fullWidth
      />
      <TextInput
        source="lastname"
        label="Nom"
        validate={[required("Le nom est obligatoire")]}
        fullWidth
      />
      <TextInput
        source="email"
        label="Email"
        validate={[
          required("L'email est obligatoire"),
          email("Format d'email invalide"),
        ]}
        fullWidth
      />
      <SelectInput
        source="department"
        label="Département"
        choices={departmentChoices}
        validate={[required("Le département est obligatoire")]}
        fullWidth
      />
      <ManagerInput />
      <BooleanInput source="isRemunerate" label="Stagiaire rémunéré" defaultValue={false} />
      <RemunerationInput />
    </SimpleForm>
  </Create>
);
