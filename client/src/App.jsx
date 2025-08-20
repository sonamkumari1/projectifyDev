import React from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Register from "./pages/Register";
import HeroSection from "./pages/students/HeroSection";
import { RouterProvider } from "react-router";
import Courses from "./pages/students/Courses";
import MyLearning from "./pages/students/MyLearning";
import Profile from "./pages/students/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import AddCourse from "./pages/admin/course/AddCourse";
import CourseTable from "./pages/admin/course/CourseTable";
import EditCourse from "./pages/admin/course/EditCourse";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
           {
            path: "course/:courseId",
            element: <EditCourse />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
