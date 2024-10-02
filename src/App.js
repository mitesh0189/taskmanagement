
import './App.css';
import { Route, BrowserRouter as Routers, Routes } from 'react-router-dom'
import Home from './component/pages/Home';
import Register from './component/pages/Register';
import Header from './component/layout/Header';
import Login from './component/pages/Login';
import toast, { Toaster } from 'react-hot-toast';
import DailyTaskForm from './component/pages/DailyTaskForm';
import DailyTaskView from './component/pages/DailyTaskView';
import UpdateTask from './component/pages/UpdateTask';
import ProtectedRoute from './component/layout/ProtectedRoute';
function App() {
  return (
    <>
    <Routers>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signup' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>

        {/* <Route path='/form' element={<DailyTaskForm></DailyTaskForm>}></Route>
        <Route path='/view' element={<DailyTaskView></DailyTaskView>}></Route>
        <Route path='/update/:id' element={<UpdateTask></UpdateTask>}></Route> */}
        <Route path="/form" element={<ProtectedRoute component={DailyTaskForm} />} />
        <Route path="/view" element={<ProtectedRoute component={DailyTaskView} />} />
        <Route path="/update/:id" element={<ProtectedRoute component={UpdateTask} />} />

      </Routes>
    </Routers>
    <Toaster></Toaster>
    </>
  );
}

export default App;
