import { createBrowserRouter } from "react-router-dom";
import AddStudent from "../pages/AddStudent";
import Authentication from "../pages/Authentication";
import EditStudent from "../pages/EditStudent";
import ManageStudents from "../pages/ManageStudents";
import Main from "../templates/Main";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Authentication></Authentication>
      },
      {
        path: '/add-student',
        element: <PrivateRoute><AddStudent></AddStudent></PrivateRoute>
      },
      {
        path: '/manage-students',
        element: <PrivateRoute><ManageStudents></ManageStudents></PrivateRoute>
      },
      {
        path: '/manage-students/:id',
        element: <PrivateRoute><EditStudent></EditStudent></PrivateRoute>,
        loader: ({ params }) => params.id
      },
    ]
  }
]);