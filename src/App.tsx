import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { EmployeeList } from "./EmployeeList";
import { EmployeeCreate } from "./EmployeeCreate";
import { EmployeeEdit } from "./EmployeeEdit";
import { EmployeeShow } from "./EmployeeShow";
import { InternList } from "./InternList";
import { InternCreate } from "./InternCreate";
import { InternEdit } from "./InternEdit";
import { InternShow } from "./InternShow";
import { Dashboard } from "./Dashboard";
import { MyLayout } from "./MyLayout";
import { darkTheme } from "./theme";

const dataProvider = jsonServerProvider("http://localhost:3002");

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      title="Gestion des Employés"
      dashboard={Dashboard}
      layout={MyLayout}
      theme={darkTheme}
    >
      <Resource
        name="employees"
        options={{ label: "Employés" }}
        list={EmployeeList}
        create={EmployeeCreate}
        edit={EmployeeEdit}
        show={EmployeeShow}
      />
      <Resource
        name="interns"
        options={{ label: "Stagiaires" }}
        list={InternList}
        create={InternCreate}
        edit={InternEdit}
        show={InternShow}
      />
    </Admin>
  );
}

export default App;
