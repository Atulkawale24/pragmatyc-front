import React, { useEffect, useState } from 'react'
import CustomInput from '../../../common-components/CustomInput'
import { useForm } from 'react-hook-form';
import TransparentButton from '../../../common-components/TransparentButton';
import ColoredButton from '../../../common-components/ColoredButton';
import { toast } from 'react-toastify';
import { communication } from '../../../services/communication';
import Loader from '../../../common-components/Loader';
import { useNavigate } from 'react-router-dom';

const AddItem = ({ data }) => {
    const navigate = useNavigate();
    const { setShowForm, toggleAction, selectedAction, setSelectedAction, setIsListUpdate } = data;
    const [isLoading, setIsLoading] = useState(false);
    const [todoDetail, setTodoDetail] = useState({});
    const {
        setValue,
        trigger,
        handleSubmit,
        control,
    } = useForm({
    });

    //fetch todo detail by id
    const fetchTodoDetailById = async (id) => {
        try {
            setIsLoading(true);
            const responseFromServer = await communication.getTodoDetail(id);
            if (responseFromServer?.data?.status === "SUCCESS") {
                console.log("detail", responseFromServer?.data);
                setTodoDetail(responseFromServer?.data?.todoDetail);
                setValue("name", responseFromServer?.data?.todoDetail?.name ?? "");
                setValue("description", responseFromServer?.data?.todoDetail?.description ?? "");
                setIsLoading(false);
            } else if (responseFromServer?.data?.status === "JWT_INVALID") {
                setIsLoading(false);
                toast.error(responseFromServer?.data?.message);
                navigate("/");
            }
            else {
                setIsLoading(false);
                toast.error(responseFromServer?.data?.message);
            }
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }
    // add/update todo item
    const addNewItem = async (data) => {
        try {
            setIsLoading(true);
            const dataToSend = {
                name: data?.name,
                description: data?.description,
            }
            const dataToUpdate = {
                name: data?.name,
                description: data?.description,
                status: todoDetail?.status,
                id: todoDetail?._id
            }
            let responseFromServer;
            if (selectedAction === "Edit") {
                responseFromServer = await communication.updateTodoItem(dataToUpdate);
            } else {
                responseFromServer = await communication.addNewTodoItem(dataToSend);
            }
            if (responseFromServer?.data?.status === "SUCCESS") {
                setIsLoading(false);
                toast.success(responseFromServer?.data?.message);
                setShowForm(false);
                setSelectedAction("");
                setIsListUpdate(prev => !prev)
            } else if (responseFromServer?.data?.status === "JWT_INVALID") {
                setIsLoading(false);
                toast.error(responseFromServer?.data?.message);
                navigate("/");
            }
            else {
                setIsLoading(false);
                toast.error(responseFromServer?.data?.message);
            }
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (selectedAction === "Edit") {
            fetchTodoDetailById(toggleAction?.id);
        }
    }, [toggleAction?.id]);

    return (
        <>
            {isLoading &&
                <Loader />
            }
            <div className='form_wrapper'>
                <div className='form'>
                    <h5 className='form_title'>Add Item</h5>
                    <CustomInput
                        control={control}
                        name="name"
                        label="Todo Name"
                        placeholder="Enter todo name..."
                        trigger={trigger}
                        rules={{
                            required: "Todo Name is required",
                        }}
                    />
                    <CustomInput
                        control={control}
                        name="description"
                        label="Description"
                        placeholder="Enter description..."
                        trigger={trigger}
                        rules={{
                            required: "Description is required",
                        }}
                    />
                    <div className='button_group'>
                        <TransparentButton name="Close" onClick={() => { setShowForm(false); setSelectedAction("") }} />
                        <ColoredButton name="Submit" onClick={handleSubmit(addNewItem)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddItem