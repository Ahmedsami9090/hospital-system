import { Expense } from "../interfaces/data.type";
const createRandomDate = ()=>{
    const currentDate = new Date();
    const startDate = new Date(2024, 9, 1)
    const randomDate =  new Date(startDate.getTime() + Math.random() * (currentDate.getTime() - startDate.getTime()))
    return randomDate.toString().slice(3,15)
}

export const medications: Expense[] = []
export const disposables: Expense[] = []
export const laboratories: Expense[] = []
const drugNames = [
    'alfaclindamycin 600 mg amp',
    'amaryl 2mg tab',
    'amaryl 3mg tab',
    'amikacin 100 mg vial',
    'amikacin 500 mg vial',
    'amirone 150 mg amp',
    'amlodipine 5mg tab',
    'amoxicillin +clavulinic acid 1gm tab',
    'ampicillin+sulbactam 1.5gm vial',
    'ampicillin+sulbactam 750 gm vial',
    'ampicillin +sulbactam 1500 mg vial',
    'arixtra 7.5 inj',
    'articaine+adrenaline amp',
    'aspocid 75 tab',
    'atorvastatin 20mg tab',
    'glucose 10% bottle',
    'glucose 25% bottle',
    'glucose 5% bottle',
    'halopridol 5mg amp',
    'heparin 5000 amp',
    'human albumin vial',
    'hydrocortizone 100m vial',
    'hypertonic saline 3% bottle',
    'insulin mixtard vial',
    'insulin actrapid vial',
    'ipratropium 0.5mg amp',
    'iruxol oint',
    'kidmin 250ml bottle',
    'lactulose bottle',
    'lactulose (duphalac ) bottle',
    'lasix 20 mg amp',
]
const disposableNames = [
    'Syringes',
    'Hypodermic Needles',
    'Disposable Infusion Sets',
    'Blood Transfusion Sets',
    'Intravenous (IV) Cannula',
    'Disposable Lancet',
    'Disposable Suction Catheters',
    'Bandages',
    'Cottons',
    'Medical gloves',
    'Disposable shoe cover',
    'Medical face masks',
]
const laboratoryNames = [
    'CBC',
    'ESR',
    'D-DIMER',
    'Z.N STAIN',
    'BLOOD GASES',
    'SODIUM',
    'POTASSIUM',
    'PROTHROMBIN TIME (PT)',
    'PTT',
    'GLUCOSE(ANY SAMPLE)',
    'UREA OR BUN',
    'CREATININE IN SERUM',
    'SGPT(ALT)',
    'SGOT(AST)',
    'ALBUMIN',
    'URINE CULTURE&SENSITIVITY',
    'CELL CULTURE FOR BODY FLUID',
    'CULTURE AND SENSITIVITY FOR ANY BIOLOGICAL FLUID OR SWAB',
    'BLOOD CULTURE &SENSITIVITY',
    'GRAM STAIN',
    'billirubin total',
    'total protein',
    'calcium total',
    'CK-MB'
]
for (let i = 0; i < 31; i++) {
    const drug: Expense = {
        name: drugNames[i],
        category : "medication",
        unitCost: Math.floor(Math.random() * 1000) / 100,
        quantity: Math.ceil(Math.random() * 10),
        dateApplied: createRandomDate()
    }
    medications.push(drug)
}
disposableNames.map((name) => {
    const disposable: Expense = {
        name,
        category: "disposables",
        unitCost: Math.floor(Math.random() * 1000) / 100,
        quantity: Math.ceil(Math.random() * 10),
        dateApplied: createRandomDate()
    }
    disposables.push(disposable)
})
laboratoryNames.map((name) => {
    const laboratory: Expense = {
        name,
        category: "laboratories",
        unitCost: Math.floor(Math.random() * 1000) / 100,
        quantity: Math.ceil(Math.random() * 10),
        dateApplied: createRandomDate()
    }
    laboratories.push(laboratory)
})
