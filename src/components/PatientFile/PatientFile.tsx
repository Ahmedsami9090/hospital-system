import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import reduxStore from '../../lib/redux/reduxStore'
import { Expense, Patient, Payments } from '../../interfaces/data.type'
import { Tabs, TextInput, Label, Select, Button } from "flowbite-react";
import { HiClipboardList, HiUserCircle } from "react-icons/hi";
import { CgPill } from "react-icons/cg";
import { FaSyringe, FaMoneyBillWave } from "react-icons/fa6";
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef } from './../../../node_modules/ag-grid-community/dist/types/core/entities/colDef.d';
import AddNewButton from '../AddNewButton/AddNewButton';
import { dischargePatient } from '../../lib/redux/patientsSlice';
import toast from 'react-hot-toast';
const PatientFile = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { patients } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
    return state.patientsSlice
  })
  const [dischargeDate, setDischargeDate] = useState<string | null>(null)
  const [dischargeReason, setDischargeReason] = useState<string | null>(null)
  useEffect(() => {
    setRowDataMedicine(clickedPatient?.medicineExpenses!)
    setrowDataDisposable(clickedPatient?.disposableExpenses!)
    setrowDataLaboratories(clickedPatient?.laboratoriesExpenses!)
    setRowDataPayments(clickedPatient?.payments!)
  }, [patients])
  const clickedPatient: Patient | undefined = patients.find((patient) => patient.nationalId === id)
  const [rowDataMedicine, setRowDataMedicine] = useState<Expense[]>(
    clickedPatient?.medicineExpenses!
  );
  const [rowDataDisposable, setrowDataDisposable] = useState<Expense[]>(
    clickedPatient?.disposableExpenses!
  );
  const [rowDataLaboratories, setrowDataLaboratories] = useState<Expense[]>(
    clickedPatient?.laboratoriesExpenses!
  )
  const [rowDataPayments, setRowDataPayments] = useState<Payments[] | null>(
    clickedPatient?.payments!
  )
  const [colDefsExpenses] = useState<ColDef<Expense>[]>([
    { headerName: 'Medicine name', field: 'name', flex: 2, filter: true },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Date', field: 'dateApplied', filter: true },
    { headerName: 'Unit Cost', field: 'unitCost', filter: true },
    { headerName: 'Quantity', field: 'quantity', filter: true },
    { headerName: 'Total Cost', valueGetter: (p) => Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(p.data?.quantity! * p.data?.unitCost!) },
  ]);
  const [colDefsPayments] = useState<ColDef<Payments>[]>([
    { headerName: 'Date', field: 'date', filter: true, flex: 2 },
    { headerName: 'Amount', field: 'amount', filter: true, flex: 2 }
  ])
  const pagination = true;
  const paginationPageSize = 5;
  const paginationPageSizeSelector = [5, 10, 20];
  const handleDiscahrgeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDischargeDate(e.target.value)
  }
  const handleDischargeReason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDischargeReason(e.target.value)
  }
  const handleDischarge = () => {
    if (dischargeDate && dischargeReason) {
      dispatch(dischargePatient({
        patientId: clickedPatient?.nationalId!,
        date: Intl.DateTimeFormat("en-US", { dateStyle: 'long' }).format(new Date(dischargeDate!)),
        reason: dischargeReason!
      }))

    } else {
      toast.error('Please fill all data')
    }
  }
  return (
    <>
      <Tabs aria-label="Tabs with icons" variant="underline">
        <Tabs.Item active title="Profile" icon={HiUserCircle}>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='font-semibold text-base text-slate-500'><h2>Patient name:</h2></div>
            <div className='text-lg'>{clickedPatient?.name}</div>
            <div className='font-semibold text-base text-slate-500'><h2>Age:</h2></div>
            <div className='text-lg'>{clickedPatient?.age}</div>
            <div className='font-semibold text-base text-slate-500'><h2>Gender:</h2></div>
            <div className='text-lg'>{clickedPatient?.gender}</div>
            <div className='font-semibold text-base text-slate-500'><h2>Phone:</h2></div>
            <div className='text-lg'>{clickedPatient?.phone}</div>
            <div className='font-semibold text-base text-slate-500'><h2>Id number:</h2></div>
            <div className='text-lg'>{clickedPatient?.nationalId}</div>
            <div className='font-semibold text-base text-slate-500'><h2>Admission Date:</h2></div>
            <div className='text-lg'>{clickedPatient?.admissionDate}</div>
            <div className='font-semibold text-base text-slate-500'><h2>Section:</h2></div>
            <div className='text-lg'>{clickedPatient?.section}</div>
            <div className='font-semibold text-base text-slate-500'><h2>Discharge Date:</h2></div>
            <div className='text-lg'>{clickedPatient?.dischargeDate ? clickedPatient.dischargeDate : 'None'}</div>
            <div className='font-semibold text-base text-slate-500'><h2>Discharge Reason:</h2></div>
            <div className='text-lg'>{clickedPatient?.dischargeReason ? clickedPatient.dischargeReason : 'None'}</div>
            <div className='font-semibold text-base text-slate-500'><h2>Total Medicines:</h2></div>
            <div className='text-lg'>
              {clickedPatient?.totalMedicine ? Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(clickedPatient?.totalMedicine!) : 0}
            </div>
            <div className='font-semibold text-base text-slate-500'><h2>Total Disposables:</h2></div>
            <div className='text-lg'>
              {clickedPatient?.disposableExpenses ? Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(clickedPatient?.totalDisposable!) : 0}
            </div>
            <div className='font-semibold text-base text-slate-500'><h2>Total laboratories:</h2></div>
            <div className='text-lg'>
              {clickedPatient?.laboratoriesExpenses ? Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(clickedPatient?.totalLaboratory!) : 0}</div>
            <div className='font-semibold text-base text-slate-500'>Total Expenses:</div>
            <div className='text-lg underline text-red-500 font-semibold'>
              {Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format((clickedPatient?.totalLaboratory! || 0) + (clickedPatient?.totalDisposable! || 0) + (clickedPatient?.totalMedicine! || 0))}</div>
            <div className='font-semibold text-base text-slate-500'>Total Payments:</div>
            <div className='text-lg text-green-400 font-semibold underline'>
              {Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(clickedPatient?.totalPayments! || 0)}
            </div>
            <div className='font-semibold text-base text-slate-500'>Balance:</div>
            <div className='text-lg font-semibold underline'>
              {Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(
                (clickedPatient?.totalPayments! || 0) - ((clickedPatient?.totalLaboratory! || 0) + (clickedPatient?.totalDisposable! || 0) + (clickedPatient?.totalMedicine! || 0)))}
            </div>
          </div>
          {clickedPatient?.isDischarged ? '' : <div className='mt-10 border-t-2 py-5'>
            <div>
              <Label htmlFor='addDischargeDate' value='Discharge Date: ' />
              <TextInput id='addDischargeDate' className='w-full md:w-1/4' type='date' value={dischargeDate!} onChange={handleDiscahrgeDate} />
            </div>
            <div>
              <Label htmlFor='addDischargeReason' value='Discharge reason:' />
              <Select id='addDischargeReason' className='w-full md:w-1/4' value={dischargeReason!} onChange={handleDischargeReason}>
                <option value="">Select...</option>
                <option value="Completed treatment">Completed treatment</option>
                <option value="deceased">Deceased</option>
                <option value="transferred">Transferred</option>
              </Select>
            </div>
            <Button className='mt-5' onClick={handleDischarge}>Submit</Button>
          </div>}
        </Tabs.Item>
        <Tabs.Item title="Medications" icon={CgPill}>
          {clickedPatient?.isDischarged? '' : <AddNewButton dataType='medication' patient={clickedPatient!} /> }
          {clickedPatient?.medicineExpenses ? <>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
              <AgGridReact
                rowData={rowDataMedicine}
                columnDefs={colDefsExpenses}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
              />
            </div>
            <div>
              <h3 className='text-xl mt-3 text-center md:text-start font-semibold'>Total : <span className=''>{Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(clickedPatient?.totalMedicine!)}</span></h3>
            </div>
          </>
            :
            <div className='text-center'>
              <h3 className='text-lg font-semibold bg-teal-500 text-white'>No medication yet</h3>
            </div>
          }
        </Tabs.Item>
        <Tabs.Item title="Disposables" className='' icon={FaSyringe}>
          <div>
            {clickedPatient?.isDischarged? '' : <AddNewButton dataType='disposables' patient={clickedPatient!} />}
            {clickedPatient?.disposableExpenses ? <>
              <div className="ag-theme-quartz" style={{ height: 500 }}>
                <AgGridReact
                  rowData={rowDataDisposable}
                  columnDefs={colDefsExpenses}
                  pagination={pagination}
                  paginationPageSize={paginationPageSize}
                  paginationPageSizeSelector={paginationPageSizeSelector}
                />
              </div>
              <div>
                <h3 className='text-xl mt-3 text-center md:text-start font-semibold'>Total : <span className=''>{Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(clickedPatient?.totalDisposable!)}</span></h3>
              </div>
            </>
              :
              <div className='text-center'>
                <h3 className='text-lg font-semibold bg-teal-500 text-white'>No disposables yet</h3>
              </div>
            }
          </div>
        </Tabs.Item>
        <Tabs.Item title="Laboratories" icon={HiClipboardList}>
          {clickedPatient?.isDischarged? '' : <AddNewButton dataType='laboratories' patient={clickedPatient!} />}
          {clickedPatient?.laboratoriesExpenses ? <>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
              <AgGridReact
                rowData={rowDataLaboratories}
                columnDefs={colDefsExpenses}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
              />
            </div>
            <div>
              <h3 className='text-xl mt-3 text-center md:text-start font-semibold'>Total : <span className=''>{Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(clickedPatient?.totalLaboratory!)}</span></h3>
            </div>
          </>
            :
            <div className='text-center'>
              <h3 className='text-lg font-semibold bg-teal-500 text-white'>No Labs yet</h3>
            </div>
          }
        </Tabs.Item>
        <Tabs.Item title="Payments" icon={FaMoneyBillWave}>
          {clickedPatient?.isDischarged? '' : <AddNewButton dataType='payment' patient={clickedPatient!} />}
          {clickedPatient?.payments ? <>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
              <AgGridReact
                rowData={rowDataPayments}
                columnDefs={colDefsPayments}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
              />
            </div>
            <div>
              <h3 className='text-xl mt-3 text-center md:text-start font-semibold'>Total : <span className=''>{Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(clickedPatient?.totalPayments!)}</span></h3>
            </div>
          </>
            :
            <div className='text-center'>
              <h3 className='text-lg font-semibold bg-teal-500 text-white'>No payments made yet</h3>
            </div>
          }
        </Tabs.Item>
      </Tabs>
    </>
  )
}
export default PatientFile