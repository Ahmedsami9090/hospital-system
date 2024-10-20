import { FaSquarePlus } from 'react-icons/fa6'
import { Modal, Button } from 'flowbite-react';
import React, { useState } from 'react';
import { Expense, Patient } from '../../interfaces/data.type';
import { disposables, laboratories, medications } from '../../data/expenses.data';
import { FloatingLabel } from "flowbite-react"
import { useDispatch } from 'react-redux';
import { addNewExpense, addPayment } from '../../lib/redux/patientsSlice';
import toast from 'react-hot-toast';
interface AddNewButtonProps {
    dataType: string
    patient: Patient
}
const AddNewButton = (props: AddNewButtonProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [searchList, setSearchList] = useState<Expense[]>([])
    const [searchInput, setsearchInput] = useState<string>('')
    const [expenseQuantity, setExpenseQuantity] = useState<number | null>(null)
    const [displaySearch, setDisplaySearch] = useState<boolean>(true)
    const [isPaymentTab, setIsPaymentTab] = useState<boolean>(false)
    const [paymentAmount, setPaymentAmount] = useState<number | null>(null)
    const [unitCost, setUnitCost] = useState<number | null>(null)
    const dispatch = useDispatch()
    const handleModalContent = () => {
        if (props.dataType === 'payment') {
            setIsPaymentTab(true)
        }
        setOpenModal(true)
    }
    const handlePaymentAmount = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setPaymentAmount(Number(e.currentTarget.value))
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchInput(e.currentTarget.value)
        if (props.dataType === 'medication') {
            setSearchList(medications.filter((medicine) => medicine.name.toLowerCase().includes(searchInput!)))
        }
        if (props.dataType === 'disposables') {
            setSearchList(disposables.filter((medicine) => medicine.name.toLowerCase().includes(searchInput!)))
        }
        if (props.dataType === 'laboratories') {
            setSearchList(laboratories.filter((medicine) => medicine.name.toLowerCase().includes(searchInput!)))
        }
        setDisplaySearch(false)
    }
    const handleExpenseQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseQuantity(Number(e.currentTarget.value))
        console.log('quant ', expenseQuantity);
    }
    const handleSelectedInput = (item: string, cost: number) => {
        setsearchInput(item)
        setUnitCost(cost)
        console.log(item);
        setDisplaySearch(true)
    }
    const handleModalClose = () => {
        setsearchInput('')
        setPaymentAmount(null)
        setExpenseQuantity(null)
        setUnitCost(null)
        setOpenModal(false)
    }
    const handleAdding = () => {
        if(isPaymentTab){
            dispatch(addPayment({
                patientId : props.patient.nationalId!,
                payment: {
                    amount: paymentAmount!,
                    date : new Date().toString().slice(3,15)
                }
            }))
            setOpenModal(false)
            setPaymentAmount(null)
        }else{
            if (searchInput && expenseQuantity) {
                dispatch(addNewExpense({
                    type: props.dataType,
                    patientId: props.patient.nationalId!,
                    newExpense: {
                        category: props.dataType,
                        dateApplied: new Date().toString().slice(3, 15),
                        name: searchInput,
                        quantity: expenseQuantity,
                        unitCost: unitCost!
                    }
                }))
                setOpenModal(false)
                setPaymentAmount(null)
            } else {
                toast.error('Please fill all data')
            }
        }
    }
    return (
        <div className='w-full  flex justify-end p-4'>
            <FaSquarePlus onClick={handleModalContent} className='text-3xl text-teal-500 cursor-pointer hover:text-teal-700' />
            <Modal size={'5xl'} className='' dismissible show={openModal} onClose={handleModalClose}>
                <Modal.Header>Add new {props.dataType.toUpperCase()}</Modal.Header>
                <Modal.Body className='overflow-hidden py-10'>
                    <div className="space-y-6">
                        <div className='relative'>
                            {isPaymentTab ?
                                <div>
                                    <div>
                                        <FloatingLabel variant='outlined' label='Amount' id='paymentAmount' type='number' value={paymentAmount!} onChange={handlePaymentAmount} required />
                                    </div>
                                </div>
                                :
                                <>
                                    <div>
                                        <FloatingLabel variant='outlined' label='name' id='expenseName' type='text' value={searchInput} onChange={handleSearch} required />
                                        <div className='z-50 h-fit max-h-28 overflow-y-scroll w-full border-1 rounded-md ps-2 py-2' hidden={displaySearch}>
                                            {searchList?.map((item) => <h5 key={item.name} className='cursor-pointer hover:bg-gray-200' onClick={() => handleSelectedInput(item.name, item.unitCost)}>{item.name}</h5>)}
                                        </div>
                                    </div>
                                    <div className='mt-10'>
                                        <FloatingLabel variant='outlined' label='quantity' type='number' id='quantity' value={expenseQuantity!} onChange={handleExpenseQuantity} />
                                    </div>
                                    <div className='mt-10'>
                                        <FloatingLabel variant='outlined' label='cost' readOnly type='number' id='cost' value={unitCost!} onChange={handleExpenseQuantity} />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAdding}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default AddNewButton