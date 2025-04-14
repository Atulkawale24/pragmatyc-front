import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/unAuth/Login";
import Register from "../pages/unAuth/Register";
import Layout from "../pages/admin/Layout";
import TodoList from "../pages/admin/todo/TodoList";
import Stat from "../pages/admin/stat/Stat";

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <Layout />
        }
      >
        <Route index element={<Navigate to="todo" />} />
        <Route path="todo" element={<TodoList />} />
        <Route path="stat" element={<Stat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
