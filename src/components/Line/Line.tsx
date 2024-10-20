import { useSelector } from 'react-redux';
import reduxStore from '../../lib/redux/reduxStore';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    plugins
} from 'chart.js';
ChartJs.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    plugins
)
interface PatientCountInterface {
    date: Date
    count: number
}
const LineGraph = () => {
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
    const patientCountPerMonth: PatientCountInterface[] = []
    for (let i = 0; i < 12; i++) {
        patientCountPerMonth.push({
            date: new Date(date.getFullYear(), date.getMonth() - i),
            count : 0
        })
    }
    hospitalPatients.forEach((patient) => {
        patientCountPerMonth.forEach((date) => {
            const admissionDate = new Date(patient.admissionDate);
            if (admissionDate.getMonth() === date.date.getMonth() && admissionDate.getFullYear() === date.date.getFullYear()) {
                date.count++;
            }
        });
    })
    patientCountPerMonth.sort().reverse()
    console.log('yyy ', patientCountPerMonth)
    const options = {
        responsive: true,
        plugins:{
            legend: {
                fullSize: false,
                display: false
            },
            title: {
                display: true,
                text: "Admissions Per Month"
            }
        }
    }
    const data = {
        labels: patientCountPerMonth.map((month)=> month.date.toString().slice(3, 15).replace('01', '')) ,
        datasets: [
            {
                label: "patients",
                data: patientCountPerMonth.map((item)=> item.count),
                borderColor: "#408ec6",
                color: "yellow",
                backgroundColor: "#408ec6"
            }
        ]
    }
    return (
        <div className=''>
            <Line data={data} options={options} />
        </div>
    )
}
export default LineGraph