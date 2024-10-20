import { FloatingLabel, Button } from 'flowbite-react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from '../../lib/redux/reduxStore';
import { Select } from 'flowbite-react';
import { addNewPatient } from '../../lib/redux/patientsSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const AddNewPatient = () => {
  const { patients } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
    return state.patientsSlice
  })
  const { userHospital } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
    return state.authSlice
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dateTimeFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: 'long' });
  const addNewPatientFormik = useFormik({
    initialValues: {
      name: '',
      id: '',
      gender: '',
      age: null,
      phone: '',
      section: '',
      admissionDate: ''
    },
    onSubmit: (val) => {
      // console.log(dateTimeFormatter.format(new Date(val.admissionDate)));
      console.log('before ',patients.length);
      dispatch(addNewPatient({
        name: val.name,
        age: val.age!,
        gender: val.gender,
        admissionDate: dateTimeFormatter.format(new Date(val.admissionDate)),
        hospitalName : userHospital,
        isDischarged : false,
        section : val.section,
        nationalId: val.id,
        phone: val.phone
      }))
      toast.success('Added successfully')
      setTimeout(() => {
        navigate('/app/all-patients')
      }, 1000);
    }
  })
  return (
    <div className='flex justify-center mt-10'>
      <div className='w-full md:w-1/2'>
        <form className='space-y-5' onSubmit={addNewPatientFormik.handleSubmit}>
          <div>
            <FloatingLabel label='Name' id='name' value={addNewPatientFormik.values.name} onChange={addNewPatientFormik.handleChange} variant='outlined' />
          </div>
          <div>
            <Select className='w-full' id='gender' value={addNewPatientFormik.values.gender} onChange={addNewPatientFormik.handleChange} >
              <option value="">Select gender...</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </Select>
          </div>
          <div>
            <FloatingLabel type='number' id='age' label='Age' value={addNewPatientFormik.values.age!} onChange={addNewPatientFormik.handleChange} variant='outlined' />
          </div>
          <div>
            <FloatingLabel id='phone' label='Phone' value={addNewPatientFormik.values.phone} onChange={addNewPatientFormik.handleChange} variant='outlined' />
          </div>
          <div>
            <FloatingLabel id='id' label='Personal ID' value={addNewPatientFormik.values.id} onChange={addNewPatientFormik.handleChange} variant='outlined' />
          </div>
          <div>
            <FloatingLabel id='admissionDate' type='date' label='Admission Date' value={addNewPatientFormik.values.admissionDate} onChange={addNewPatientFormik.handleChange} variant='outlined' />
          </div>
          <div>
            <Select id='section' value={addNewPatientFormik.values.section} onChange={addNewPatientFormik.handleChange}>
              <option value="">Select section...</option>
              <option value="ward A">Ward A</option>
              <option value="ward B">Ward B</option>
              <option value="ward C">Ward C</option>
            </Select>
          </div>
          <Button type='submit' className='px-3'>Add</Button>
        </form>
      </div>
    </div>
  )
}
export default AddNewPatient