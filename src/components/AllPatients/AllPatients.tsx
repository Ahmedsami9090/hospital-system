import { useSelector } from "react-redux";
import reduxStore from "../../lib/redux/reduxStore";
import { useNavigate } from "react-router-dom";
import { Patient } from "../../interfaces/data.type";
import { useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef } from './../../../node_modules/ag-grid-community/dist/types/core/entities/colDef.d';
interface OnRowClickedEvent {
  data: Patient | any
}
const AllPatients = () => {
  const { patients } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
    return state.patientsSlice
  })
  const { userHospital } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
    return state.authSlice
  })
  const [rowData] = useState<Patient[]>(
    patients.filter((patient) => patient.hospitalName == userHospital)
  );
  const navigate = useNavigate()
  const onRowClicked = ({ data }: OnRowClickedEvent) => {
    console.log('clicked: ', data.name);
    navigate(`/app/patient-file/${data.nationalId}`)
  };
  const [colDefs] = useState<ColDef<Patient>[]>([
    { headerName: 'Name', field: "name", filter: true, flex: 2 },
    { headerName: 'Gender', field: "gender", filter: true },
    { headerName: 'ID number', field: "nationalId", filter: true },
    { headerName: 'Section', field: "section", filter: true },
    { headerName: 'Admission Date', field: "admissionDate", filter:true},
    { headerName: 'Discharge Date', field: "dischargeDate", filter: true, },
  ]);
  const pagination = true;
  const paginationPageSize = 5;
  const paginationPageSizeSelector = [5, 10, 20];
  return (
    <>
      <div
        className="ag-theme-quartz h-full " // applying the Data Grid theme
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onRowClicked={onRowClicked}
          rowClass={'cursor-pointer'}
        />
      </div>
    </>

  )
}
export default AllPatients