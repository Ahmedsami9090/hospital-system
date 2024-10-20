import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { useSelector } from 'react-redux';
import reduxStore from '../../lib/redux/reduxStore';
import { wardNames } from '../../data/hospitals';
ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
)
const PieGraph = () => {
    const { patients } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
        return state.patientsSlice
    })
    const { userHospital } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
        return state.authSlice
    })
    const hospitalPatients = patients.filter((patient) => {
        return patient.hospitalName === userHospital
    })
    let wardA = 0, wardB = 0, wardC = 0
    hospitalPatients.forEach(patient => {
        if (patient.section == 'ward A') { wardA++ }
        else if (patient.section == 'ward B') { wardB++ }
        else if (patient.section == 'ward C') { wardC++ }
    }
    )
    const options = {
        responsive: true,
        plugins:{
            legend: {
                fullSize: false,
                display: true
            },
            title: {
                display: true,
                text: "Patient per section"
            }
        }
    }
    const data = {
        labels: wardNames,
        datasets: [
            {
                label: "patients",
                data: [wardA, wardB, wardC],
                borderColor: "transparent",
                backgroundColor: ["#d9a5b3", "#1868ae", "#c6d7eb"]
            }
        ]
    }
    return (
        <div className='h-full flex items-center justify-center'>
            <Doughnut data={data} options={options} />
        </div>
    )
}
export default PieGraph