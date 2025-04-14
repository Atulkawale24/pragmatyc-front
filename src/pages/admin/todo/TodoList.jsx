import React, { useEffect, useState } from "react";
import TopHeader from "../../../common-components/TopHeader";
import ButtonHeader from "../../../common-components/ButtonHeader";
import Pagination from "../../../common-components/Pagination";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiPassPendingFill } from "react-icons/ri";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import TableActionOptions from "../../../common-components/TableActionOptions";
import AddItem from "./AddItem";
import Loader from "../../../common-components/Loader";
import { communication } from "../../../services/communication";
import { toast } from "react-toastify";
import Filter from "../../../common-components/Filter";

const TodoList = () => {

    const pageLimit = 10
    const navigate = useNavigate();
    const [toggleAction, setToggleAction] = useState({
        id: "",
        state: false,
    });
    const [selectedAction, setSelectedAction] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [todoList, setTodoList] = useState([]);
    const [isListUpdated, setIsListUpdate] = useState(false);

    //page data
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);

    //filter data
    const [filterData, setFilterData] = useState({
        startDate: "",
        endDate: "",
        status: "",
        state: false
    })
    const actionOptions = [
        {
            name: "Edit",
            icon: <FaEdit color={selectedAction !== "Edit" ? "#2937A4" : "#fff"} />,
        },
        {
            name: "Pending",
            icon: (
                <RiPassPendingFill
                    color={selectedAction !== "Pending" ? "#2937A4" : "#fff"}
                />
            ),
        },
        {
            name: "Done",
            icon: (
                <IoCheckmarkDoneCircleSharp
                    color={selectedAction !== "Done" ? "#2937A4" : "#fff"}
                />
            ),
        },
    ];

    //fetch todo list
    const fetchTodoList = async (searchString, page, filterData) => {
        try {
            const { startDate, endDate, status } = filterData;
            setIsLoading(true);
            const responseFromServer = await communication.getTodoItemList(searchString, page, startDate, endDate, status);
            if (responseFromServer?.data?.status === "SUCCESS") {
                setIsLoading(false);
                setTodoList(responseFromServer?.data?.data);
                setPageCount(responseFromServer?.data?.totalPages);
                setPage(page);
            } else if (responseFromServer?.data?.status === "JWT_INVALID") {
                setIsLoading(false);
                toast.error(responseFromServer?.data?.message);
                navigate("/");
            }
            else {
                setTodoList([]);
                setIsLoading(false);
                setPageCount(0);
            }
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }


    //change todo status
    const changeTodoStatus = async (id, status) => {
        try {
            setIsLoading(true);
            const responseFromServer = await communication.updateTodoStatus(id, status);
            if (responseFromServer?.data?.status === "SUCCESS") {
                setIsLoading(false);
                toast.success(responseFromServer?.data?.message);
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
    //fetch list on initial load
    useEffect(() => {
        let debounce;
        if (searchString) {
            debounce = setTimeout(() => {
                fetchTodoList(searchString, currentPage, filterData);
            }, 500);
            setCurrentPage(1);
        } else {
            fetchTodoList(searchString, currentPage, filterData);
        }
        //clearing timeout on component unmounting
        return () => {
            clearTimeout(debounce);
        };
    }, [searchString, isListUpdated]);

    //handling actions
    useEffect(() => {
        if (["Pending", "Done"]?.includes(selectedAction)) {
            changeTodoStatus(toggleAction?.id, selectedAction);
        } else if (selectedAction === "Edit") {
            setShowForm(true)
        }
    }, [selectedAction]);

    return (
        <>
            {isLoading &&
                <Loader />
            }
            <TopHeader currentTab="Todo List" searchString={searchString} setSearchString={setSearchString} />
            <ButtonHeader
                name="Add Item"
                coloredButtonClick={() => setFilterData({ ...filterData, state: true })}
                onClick={() => setShowForm(true)}
            />
            <div className="table_wrapper mt-4">
                <div className="table_main">
                    <div className="table_header shadow-sm">
                        <div className="table_th col_20_percent">Sr. No</div>
                        <div className="table_th col_20_percent">Name</div>
                        <div className="table_th col_30_percent">Description</div>
                        <div className="table_th col_20_percent">Status</div>
                        <div className="table_th col_10_percent flex justify-center items-center">
                            Action
                        </div>
                    </div>
                    {todoList?.length > 0 ?
                        <>
                            {todoList?.map((todoData, index) => {
                                return (
                                    <div className="table_data shadow-sm" key={index}>
                                        <div className="table_td col_20_percent">{Number(pageLimit) * (page - 1) + (index + 1)}</div>
                                        <div className="table_td col_20_percent">{todoData?.name}</div>
                                        <div className="table_td col_30_percent">{todoData?.description}</div>
                                        <div className="table_td col_20_percent">{todoData?.status}</div>
                                        <div className="table_td col_10_percent flex justify-center items-center relative">
                                            {todoData?.status?.toLowerCase() !== "done" ?
                                                <BsThreeDotsVertical
                                                    onClick={() => {
                                                        setToggleAction({
                                                            ...toggleAction,
                                                            id: todoData?._id,
                                                            state: !toggleAction?.state,
                                                        });
                                                        setSelectedAction(!toggleAction?.state && "")
                                                    }
                                                    }
                                                />
                                                :
                                                "--"
                                            }
                                            {toggleAction?.id === todoData?._id && toggleAction?.state && (
                                                <TableActionOptions
                                                    data={{
                                                        actionOptions,
                                                        selectedAction,
                                                        setSelectedAction,
                                                        toggleAction,
                                                        setToggleAction,
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                        :
                        <h5 className="text-center my-10">Todo item not available.</h5>
                    }
                </div>
            </div>
            <div>
                <Pagination
                    setIsListUpdate={setIsListUpdate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageCount={pageCount} />
            </div>
            {showForm &&
                <AddItem data={{ setShowForm, showForm, toggleAction, selectedAction, setSelectedAction, setIsListUpdate }} />
            }
            {filterData?.state &&
                <Filter data={{
                    options: [{ label: "New", value: "New" },
                    { label: "Pending", value: "Pending" },
                    { label: "Done", value: "Done" },
                    ],
                    setFilterData,
                    filterData,
                    setIsListUpdate
                }} />
            }
        </>
    );
};

export default TodoList;
