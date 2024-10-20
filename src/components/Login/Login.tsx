import { Button, Select, Label, TextInput } from "flowbite-react";
import { MdPerson, MdPassword } from "react-icons/md";
import { validateInput } from "../../lib/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { hospitals } from "../../data/hospitals";
import { useNavigate } from "react-router-dom";
import reduxStore from "../../lib/redux/reduxStore";
import { useEffect } from "react";
interface ValidatePayloadInterface {
    username: string
    password: string
    hospital: string
}
export default function Login() {
    const sharedData = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
        return state.authSlice
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = (val: ValidatePayloadInterface) => {
        dispatch(validateInput(val))
    }
    useEffect(() => {
        if (sharedData.isValid) {
            navigate('/app', {replace: true})
        }
    }, [sharedData.isValid])
    const loginFormik = useFormik({
        initialValues: {
            username: '',
            password: '',
            hospital: '',
        },
        onSubmit: (val) => {
            handleLogin(val)
        },
    })
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold">Hospital Manage System</h1>
                    <h2 className="mt-4 text-2xl font-semibold">Login</h2>
                </div>
                <form onSubmit={loginFormik.handleSubmit} className="flex w-full md:w-1/4 flex-col gap-4 px-2">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="Username (user1)" />
                        </div>
                        <TextInput id="username" onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} value={loginFormik.values.username} icon={MdPerson} type="text" placeholder="Enter your username" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password (123)" />
                        </div>
                        <TextInput id="password" onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} value={loginFormik.values.password} icon={MdPassword} type="password" placeholder="Enter your password" required />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <div className="mb-2 block">
                            <Label htmlFor="hospital" value="Hospital (Hospital A)" />
                        </div>
                        <Select id="hospital" onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} value={loginFormik.values.hospital} className="w-full" required>
                            <option defaultChecked value="">Select your Hospital</option>
                            {hospitals.map((hospital) => <option value={hospital.name} key={hospital.name}>{hospital.name}</option>)}
                        </Select>
                    </div>
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </>
    );
}
