import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { EmployeeList } from "./employee/EmployeeList";
import { EmployeeCreate } from "./employee/EmployeeCreate";
import { EmployeeEdit } from "./employee/EmployeeEdit";
import { EmployeeShow } from "./employee/EmployeeShow";
import { InternList } from "./intern/InternList";
import { InternCreate } from "./intern/InternCreate";
import { InternEdit } from "./intern/InternEdit";
import { InternShow } from "./intern/InternShow";
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
