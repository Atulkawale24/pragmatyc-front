import React, { useEffect, useState } from 'react'
import CustomSelect from './CustomSelect'
import CustomInput from './CustomInput';
import { useForm } from 'react-hook-form';
import TransparentButton from './TransparentButton';
import ColoredButton from './ColoredButton';
import { toast } from 'react-toastify';
import Label from './text-components/Label';

const Filter = ({ data }) => {
    const { options, setFilterData, filterData, setIsListUpdate } = data;
    const [status, setStatus] = useState("")
    const {
        setValue,
        watch,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
    });
    const startDate = watch("startDate");
    const endDate = watch("endDate");

    useEffect(() => {
        if (filterData) {
            setValue("startDate", filterData?.startDate);
            setValue("endDate", filterData?.endDate);
            setStatus({ label: filterData?.status, value: filterData?.status })
        }
    }, []);

    //filter 
    const filterTodoData = (data) => {
        try {
            setFilterData({ ...filterData, startDate: data?.startDate, endDate: data?.endDate, status: status?.value, state: false });
            setIsListUpdate(prev => !prev);
        } catch (error) {
            toast.error(error?.message)
        }
    }

    //clear filter value
    const clearFilterValue = () => {
        setFilterData({ ...filterData, startDate: "", endDate: "", status: "", state: false });
        setIsListUpdate(prev => !prev);
    }
    return (
        <div className='form_wrapper'>
            <div className='form'>
                <h5 className='form_title mb-5'>Filter</h5>
                <label className="font-Poppins text-black mb-5" style={{ fontSize: "15px" }}>Status</label>
                <CustomSelect
                    width="100%"
                    placeholder="Status"
                    options={options}
                    value={status}
                    onChange={(val) => setStatus(val)}
                />
                <div className='flex gap-5 my-3'>
                    <CustomInput
                        control={control}
                        name="startDate"
                        label="Start Date"
                        type='date'
                        placeholder="Start Date..."
                    />
                    <CustomInput
                        control={control}
                        name="endDate"
                        label="End Date"
                        type='date'
                        placeholder="End Date..."
                    />
                </div>
                <div className='button_group'>
                    <TransparentButton name="Close" onClick={() => clearFilterValue()} />
                    <ColoredButton name="Submit" onClick={handleSubmit(filterTodoData)} />
                </div>
            </div>
        </div>
    )
}

export default Filter