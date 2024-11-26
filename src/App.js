import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import UserList from './components/Users/UserList';
import RoleList from './components/Roles/RoleList';
import { RecoilRoot } from 'recoil';
import { Signup } from './components/Login/Signup';
import { Signin } from './components/Login/Signin';

// const App = () => {
//   return (
    
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/users" element={<UserList />} />
//         <Route path="/roles" element={<RoleList />} />
//       </Routes>
//     </Router>
//   );
// };

const App=()=>{
  return(
    <RecoilRoot>
      <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/" element={<Signin />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/roles" element={<RoleList />} />
      </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
