import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Context from "./pages/Context";
import Student from "./pages/Student";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Course from "./pages/Course";
import Progress from "./pages/Progress";
import EditCourse from "./pages/EditCourse";
import Login from "./pages/Login";
import StudentList from "./pages/StudentList";




const Layout = ({ children }) => {
  const location = useLocation();
  const showHeaderAndSidebar =
   true

  return (
    <div className="flex flex-col h-screen">
      {showHeaderAndSidebar && <Header />}
      {showHeaderAndSidebar && <Sidebar />}
        <main className="flex-grow p-6  bg-[#171B2D] overflow-auto">
          {children}
        </main>
      
      
    </div>
  );
};

function App() {
  return (
    <Context>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
                <Layout>
                  <Dashboard />
                </Layout>
            }
          />
          <Route
            path="/account"
            element={
                <Layout>
                  <Account />
                </Layout>
            }
          />
          <Route
            path="/studentlist"
            element={
                <Layout>
                  <StudentList />
                </Layout>
            }
          />
          <Route
            path="/progress"
            element={
                <Layout>
                  <Progress />
                </Layout>
            }
          />
          <Route
            path="/student"
            element={
                <Layout>
                  <Student />
                </Layout>
            }
          />
           <Route
            path="/edit-course"
            element={
                <Layout>
                  <EditCourse />
                </Layout>
            }
          />
          <Route
            path="/login"
            element={
                <Layout>
                  <Login />
                </Layout>
            }
          />
          <Route
            path="/course"
            element={
                <Layout>
                  <Course/>
                </Layout>
            }
          />
        </Routes>
      </Router>
    </Context>
  );
}

export default App;
