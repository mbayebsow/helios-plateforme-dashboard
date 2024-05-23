import { Routes, Route } from "react-router-dom";
import RouteLayout from "./components/layouts/rootLayout";
import DashLayout from "./components/layouts/dashLayout";
import AuthLayout from "./components/layouts/authLayout";

import LoginPage from "./pages/auth/login.page";
import OtpGeneratePage from "./pages/auth/otpGenerate.page";
import OtpValidetePage from "./pages/auth/otpValidete.page";

import DashboardPage from "./pages/dash";

import ProjectsPage from "./pages/dash/projects/projects.page";
import AddProjectPage from "./pages/dash/projects/addProject.page";
import EditProjectPage from "./pages/dash/projects/editProject.page";
import ViewProjectPage from "./pages/dash/projects/viewProject.page";

import TaskPage from "./pages/dash/tasks/task.page";
import AddTaskPage from "./pages/dash/tasks/addTask.page";
import EditTaskPage from "./pages/dash/tasks/editTask.page";
import ViewTaskPage from "./pages/dash/tasks/viewTask.page";

import EstimatePage from "./pages/dash/estimates/estimate.page";

import InvoicePage from "./pages/dash/invoices/invoice.page";

import TransactionPage from "./pages/dash/transactions/transaction.page";

import ContractPage from "./pages/dash/contracts/contract.page";

import ClientstPage from "./pages/dash/clients/clients.page";
import AddClientPage from "./pages/dash/clients/addClient.page";
import EditClientPage from "./pages/dash/clients/editClient.page";
import ViewClientPage from "./pages/dash/clients/viewClient.page";

import EmployeesPage from "./pages/dash/employees/employees.page";
import AddEmployeePage from "./pages/dash/employees/addEmployee.page";
import EditEmployeePage from "./pages/dash/employees/editEmployee.page";
import ViewEmployeePage from "./pages/dash/employees/viewEmployee.page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RouteLayout />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="otp/setup" element={<OtpGeneratePage />} />
            <Route path="otp/validate" element={<OtpValidetePage />} />
            <Route path="*" element={<div> Not Found or You do not have permission.</div>} />
          </Route>

          <Route path="/dash" element={<DashLayout title="Dashboard" />}>
            <Route index element={<DashboardPage title="Dashboard" />} />

            <Route path="projets" element={<ProjectsPage title="Projets" />}>
              <Route path="create" element={<AddProjectPage />} />
              <Route path="view/:id" element={<ViewProjectPage />} />
              <Route path="edit/:id" element={<EditProjectPage />} />
            </Route>

            <Route path="taches" element={<TaskPage title="Taches" />}>
              <Route path="create" element={<AddTaskPage />} />
              <Route path="view/:id" element={<ViewTaskPage />} />
              <Route path="edit/:id" element={<EditTaskPage />} />
            </Route>

            <Route path="devis" element={<EstimatePage title="Devis" />}>
              <Route path=":action" element={<EstimatePage title="Devis" />}>
                <Route path=":id" element={<EstimatePage title="Devis" />} />
              </Route>
            </Route>

            <Route path="factures" element={<InvoicePage title="Factures" />}>
              <Route path=":action" element={<InvoicePage title="Factures" />}>
                <Route path=":id" element={<InvoicePage title="Factures" />} />
              </Route>
            </Route>

            <Route path="transactions" element={<TransactionPage title="Transactions" />}>
              <Route path=":action" element={<TransactionPage title="Transactions" />}>
                <Route path=":id" element={<TransactionPage title="Transactions" />} />
              </Route>
            </Route>

            <Route path="contrats" element={<ContractPage title="Contrats" />}>
              <Route path=":action" element={<ContractPage title="Contrats" />}>
                <Route path=":id" element={<ContractPage title="Contrats" />} />
              </Route>
            </Route>

            <Route path="clients" element={<ClientstPage title="Clients" />}>
              <Route path="create" element={<AddClientPage />} />
              <Route path="view/:id" element={<ViewClientPage />} />
              <Route path="edit/:id" element={<EditClientPage />} />
            </Route>

            <Route path="employes" element={<EmployeesPage title="Employes" />}>
              <Route path="create" element={<AddEmployeePage />} />
              <Route path="view/:id" element={<ViewEmployeePage />} />
              <Route path="edit/:id" element={<EditEmployeePage />} />
            </Route>

            <Route path="*" element={<div> Not Found or You do not have permission.</div>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
