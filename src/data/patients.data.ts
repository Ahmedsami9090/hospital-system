import { Patient } from "../interfaces/data.type";
import { medications, disposables, laboratories } from "./expenses.data";
import { hospitals, wardNames } from "./hospitals";
const createRandomDate = ()=>{
    const currentDate = new Date();
    const startDate = new Date(2024, 0, 1)
    const randomDate =  new Date(startDate.getTime() + Math.random() * (currentDate.getTime() - startDate.getTime()))
    return randomDate
}
export let patientsData: Patient[] = []

const names = [
    'Justin Gill',
    'Virginia Rampling',
    'Ella Nash',
    'Alexander Russell',
    'Brian MacLeod',
    'Alison White',
    'Ryan Stewart',
    'Frank Paterson',
    'Oliver MacDonald',
    'Leonard Short',
    'Sonia Walker',
    'Leonard Miller',
    'Matt Harris',
    'Heather Thomson',
    'Sam Howard',
    'Adam James',
    'Jack Jackson',
    'Gavin Abraham',
    'Keith Harris',
    'Kevin Chapman',
    'Hannah Simpson',
    'Owen Taylor',
    'Faith Buckland',
    'Jonathan Avery',
    'Robert Brown',
    'Kevin Wright',
    'Mary Vaughan',
    'Megan Brown',
    'Adam Young',
    'Gabrielle North',
    'Gavin Abraham',
    'Keith Harris',
    'Kevin Chapman',
    'Hannah Simpson',
    'Owen Taylor',
    'Faith Buckland',
    'Jonathan Avery',
    'Robert Brown',
    'Kevin Wright',
    'Mary Vaughan',
    'Megan Brown',
    'Adam Young',
    'Gabrielle North',
    'Ella Nash',
    'Alexander Russell',
    'Brian MacLeod',
    'Alison White',
    'Ryan Stewart',
    'Frank Paterson',
    'Oliver MacDonald',
    'Leonard Short',
    'Sonia Walker',
    'Leonard Miller',
    'Matt Harris',
    'Heather Thomson',
    'Sam Howard',
    'Adam James',
    'Jack Jackson',
    'Kevin Chapman',
    'Hannah Simpson',
    'Owen Taylor',
    'Faith Buckland',
    'Jonathan Avery',
    'Robert Brown',
    'Kevin Wright',
    'Mary Vaughan',
    'Megan Brown',
    'Adam Young',
    'Gabrielle North',
    'Gavin Abraham',
    'Keith Harris',
    'Kevin Chapman',
    'Hannah Simpson',
    'Owen Taylor',
]
const gender = ['male', 'female']
const hospitalName = hospitals.map((hospital)=>hospital.name)



const totalMedicine = medications.reduce((acc, medication)=> acc + (medication.quantity * medication.unitCost), 0)
const totalDisposable = disposables.reduce((acc, disposable)=> acc + (disposable.quantity * disposable.unitCost), 0)
const totalLaboratory = laboratories.reduce((acc, medication)=> acc + (medication.quantity * medication.unitCost), 0)
for(let i = 0; i < names.length; i++) {
    const patient: Patient = {
        name : names[i],
        age: Math.ceil(Math.random() * 100),
        gender: gender[i % gender.length],
        admissionDate: createRandomDate().toString().slice(3,15),
        isDischarged: false,
        section : wardNames[i % wardNames.length],
        nationalId: Math.ceil(Math.random() * 10000).toString(),
        phone: Math.ceil(Math.random() * 10000000).toString(),
        dischargeDate: '',
        hospitalName: hospitalName[i % hospitalName.length],
        dischargeReason: null,
        medicineExpenses: medications,
        disposableExpenses: disposables,
        laboratoriesExpenses : laboratories,
        totalMedicine: totalMedicine,
        totalDisposable: totalDisposable,
        totalLaboratory: totalLaboratory,
        payments: null,
    }
    patientsData = [patient,...patientsData]
}