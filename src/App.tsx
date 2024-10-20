import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Patients from './components/Patients/Patients'
import Finance from './components/Finance/Finance'
import Dashboard from './components/Dashboard/Dashboard'
import AllPatients from './components/AllPatients/AllPatients'
import AddNew from './components/AddNewPatient/AddNewPatient'
import PatientFile from './components/PatientFile/PatientFile'
import Income from './components/Income/Income'
import Expenses from './components/Expenses/Expenses'
import Invoice from './components/Invoice/Invoice'
import Login from './components/Login/Login'
import { Provider } from 'react-redux'
import reduxStore from './lib/redux/reduxStore'
import Guard from './components/Guard/Guard'
import { Toaster } from 'react-hot-toast'

function App() {
  const router = createBrowserRouter([
    { path: '', element: <Login /> },
    {
      path: 'app', element: <Guard><Layout /></Guard>, children: [
        { path: '', element: <Dashboard /> },
        { path: 'all-patients', element: <AllPatients /> },
        { path: 'add-new', element: <AddNew /> },
        { path: 'patient-file/:id', element: <PatientFile /> },
        { path: 'income', element: <Income /> },
        { path: 'expenses', element: <Expenses /> },
        { path: 'invoices', element: <Invoice /> }
      ]
    },
    {path: '*',element: <h1>not here</h1>}
  ])
  return (
    <>
      <Provider store={reduxStore}>
        <RouterProvider router={router} />
        <Toaster/>
      </Provider>
    </>
  )
}
export default App
