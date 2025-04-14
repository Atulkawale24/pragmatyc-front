import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const getCookie = () => {
    const token = Cookies.get("pragmatyc_token");
    return token ?? ""
}

function getServerUrl() {
    // return "http://localhost:3021";
return "http://103.220.82.181:7080";
}

export const communication = {
    userRegistration: (dataToSend) => {
        try {
            const result = axios.post(`${getServerUrl()}/user/register-user`, dataToSend, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return result;
        } catch (error) {
            toast.error(error?.message);
        }
    },
    loginUser: (dataToSend) => {
        try {
            const result = axios.post(`${getServerUrl()}/user/login`, dataToSend, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return result;
        } catch (error) {
            toast.error(error?.message);
        }
    },

    //api's for todo
    addNewTodoItem: async function (dataToSend) {
        try {
            const result = axios.post(
                `${getServerUrl()}/todo/add-todo`,
                dataToSend,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCookie()}`
                    }
                }
            );
            return result;
        } catch (error) {
            toast.error(error?.message);
        }
    },
    updateTodoItem: async function (dataToSend) {
        try {
            const result = axios.post(
                `${getServerUrl()}/todo/update-todo`,
                dataToSend,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCookie()}`
                    }
                }
            );
            return result;
        } catch (error) {
            toast.error(error?.message);
        }
    },
    getTodoItemList: async function (searchString, page, startDate, endDate, status) {
        try {
            const result = axios.post(
                `${getServerUrl()}/todo/get-todo-list`,
                { searchString, page, startDate, endDate, status },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCookie()}`
                    }
                }
            );
            return result;
        } catch (error) {
            toast.error(error?.message);
        }
    },
    getTodoDetail: async function (id) {
        try {
            const result = axios.post(
                `${getServerUrl()}/todo/get-todo-detail`,
                { id },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCookie()}`
                    }
                }
            );
            return result;
        } catch (error) {
            toast.error(error?.message);
        }
    },
    updateTodoStatus: async function (id, status) {
        try {
            const result = axios.post(
                `${getServerUrl()}/todo/change-todo-status`,
                { id, status },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCookie()}`
                    }
                }
            );
            return result;
        } catch (error) {
            toast.error(error?.message);
        }
    },
}
