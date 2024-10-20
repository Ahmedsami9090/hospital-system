import { createSlice } from "@reduxjs/toolkit";
import { Expense, Patient, Payments } from "../../interfaces/data.type";
import { patientsData } from "../../data/patients.data";
interface AddNewExpensePayload {
    payload: {
        type: string
        patientId: string
        newExpense: Expense
    }
}
interface AddPaymentPayload {
    payload: {
        payment: Payments
        patientId: string
    }
}
interface AddNewPatientInterface {
    payload : Patient
}
interface DischargePatientPayload {
    payload : {
        patientId : string
        date : string
        reason : string
    }
}
const initialState: { patients: Patient[] } = {
    patients: patientsData
}
const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        addNewPatient: (state, {payload} : AddNewPatientInterface)=>{
            state.patients = [payload, ...state.patients]
        },
        addNewExpense: (state, { payload }: AddNewExpensePayload) => {
            console.log(payload)
            if (payload.type === 'medication') {
                const result = state.patients.find((patient) => patient.nationalId === payload.patientId)
                if (result) {
                    result.medicineExpenses = [payload.newExpense,...(result.medicineExpenses! || [])]
                    result.totalMedicine = result.medicineExpenses?.reduce((acc, item) => acc + (item.quantity * item.unitCost), 0)
                }
            }
            if (payload.type === 'disposables') {
                const result = state.patients.find((patient) => patient.nationalId === payload.patientId)
                if (result) {
                    result.disposableExpenses = [payload.newExpense,...(result.disposableExpenses! || [])]
                    result.totalDisposable = result.disposableExpenses?.reduce((acc, item) => acc + (item.quantity * item.unitCost), 0)
                }
            }
            if (payload.type === 'laboratories') {
                const result = state.patients.find((patient) => patient.nationalId === payload.patientId)
                if (result) {
                    result.laboratoriesExpenses = [payload.newExpense,...(result.laboratoriesExpenses! || [])]
                    result.totalLaboratory = result.laboratoriesExpenses?.reduce((acc, item) => acc + (item.quantity * item.unitCost), 0)
                }
            }
        },
        addPayment: (state, { payload }: AddPaymentPayload) => {
            const result = state.patients.find((patient) => patient.nationalId === payload.patientId)
            if (result) {
                result.payments = [payload.payment,...(result.payments || [])]
                result.totalPayments = result.payments.reduce((acc, item)=>acc + item.amount, 0)
            }
        },
        dischargePatient: (state, {payload} : DischargePatientPayload)=>{
            const result = state.patients.find((patient)=>patient.nationalId === payload.patientId)
            if (result){
                result.dischargeDate = payload.date
                result.dischargeReason = payload.reason
                result.isDischarged = true                
            }
        }
    }
})
export default patientsSlice.reducer
export const { addNewExpense, addPayment , addNewPatient, dischargePatient} = patientsSlice.actions