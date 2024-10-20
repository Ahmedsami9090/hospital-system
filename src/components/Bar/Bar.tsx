import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import reduxStore from '../../lib/redux/reduxStore';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    plugins,
    ChartOptions,
} from 'chart.js';
ChartJs.register(CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    plugins
)
interface ExpenseIncomePerMonthInterface{
    date : Date
    income : number
    expense : number
}
const BarGraph = () => {
    const { patients } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
        return state.patientsSlice
    })
    const { userHospital } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
        return state.authSlice
    })
    const hospitalPatients = patients.filter((patient) => {
        return patient.hospitalName === userHospital
    })
    const date = new Date();
    const totalExpIncPerMonth: ExpenseIncomePerMonthInterface[] = []
    for (let i = 0; i < 12; i++) {
        totalExpIncPerMonth.push({
            date: new Date(date.getFullYear(), date.getMonth() - i),
            income: 0,
            expense: 0
        })
    }
    hospitalPatients.forEach((patient) => {
        totalExpIncPerMonth.forEach((date) => {
            const admissionDate = new Date(patient.admissionDate);
            if (admissionDate.getMonth() === date.date.getMonth() && admissionDate.getFullYear() === date.date.getFullYear()) {
                date.expense += (patient.totalDisposable || 0) + (patient.totalMedicine || 0) + (patient.totalLaboratory || 0)
                date.income += patient.totalPayments || 0
            }
        });
    })
    const options : ChartOptions<'bar'> = {
        responsive : true,
        plugins: {
            legend: {
                position: "right",
            },
            title:{
                display: true,
                text : "Income/Expense"
            }
        }
    }
    const data = {
        labels: totalExpIncPerMonth.map((month)=> month.date.toString().slice(3, 15).replace('01', '')),
        datasets: [
            {
                label: "Income",
                data: totalExpIncPerMonth.map((item)=> item.income),
                borderColor: "transparent",
                backgroundColor: " green"

            },
            {
                label: "Expense",
                data: totalExpIncPerMonth.map((item)=> item.expense),
                borderColor: "transparent",
                backgroundColor: " red"
            }
        ]
    }
    return (
        <div>
            <Bar data={data} options={options}/>
        </div>
    )
}
export default BarGraph