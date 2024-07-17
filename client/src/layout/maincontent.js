import EditEmployee from '../components/editemployee.js';
import EmployeeList from '../pages/employeelist.js';
import AddEmployee from '../components/addemployee';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const MainContent = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element = {<EmployeeList/>}/>
                <Route path="/employees" element = {<EmployeeList/>}/>
                <Route path="/employees/add" element = {<AddEmployee/>}/>
                <Route path="/employees/:id" element = {<EditEmployee/>}/>
                
            </Routes>
        </Router>
    )
}

export default MainContent;