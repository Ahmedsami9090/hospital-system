import LineGraph from '../Line/Line';
import BarGraph from '../Bar/Bar';
import PieGraph from '../Pie/Pie';
const Dashboard = () => {
  return (
    <div>
      <div className='grid grid-row-2'>
        <div className='grid grid-cols-2'>
          <LineGraph />
          <div className=' h-full flex items-center justify-center'>
            <PieGraph />
          </div>
        </div>
        <div className='grid grid-cols-4'>
          <div className='col-span-2 col-start-2'>
          <BarGraph />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
