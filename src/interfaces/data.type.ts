export interface User {
    username: string,
    password: string,
    hospital: Hospital
}
export interface Hospital {
    name: string,
    logo: string
}
export interface Patient {
    name: string,
    nationalId: string,
    gender: string,
    age: number,
    section : string,
    phone: string,
    admissionDate: string,
    isDischarged: boolean,
    dischargeDate?: string,
    dischargeReason? : string | null
    hospitalName : string
    medicineExpenses?: Expense[] | null
    disposableExpenses?: Expense[] | null
    laboratoriesExpenses?: Expense[] | null
    payments?: Payments[] | null
    totalMedicine?: number
    totalDisposable? : number
    totalLaboratory?: number
    totalPayments? : number
    
}
export interface Expense {
    name: string,
    category : string
    unitCost: number,
    quantity: number,
    dateApplied : string
}
export interface Payments{
    date: string
    amount : number
}