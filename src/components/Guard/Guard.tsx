import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import reduxStore from '../../lib/redux/reduxStore'
import { useNavigate } from 'react-router-dom'
interface GuardProps {
    children: ReactNode
}
const Guard = (props: GuardProps) => {
    const navigate = useNavigate()
    const sharedData = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
        return state.authSlice
    })
    if (sharedData.isValid) {
        return props.children
    }
    useEffect(()=>{
        if(!sharedData.isValid){
            navigate('/')
        }
    },[sharedData.isValid])
}
export default Guard