import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Signup2 from './pages/Signup2'

// // firebase.js에서 db를 import
// import { db } from './utils/Firebase';
// import { useEffect, useState } from 'react';
// // firestore의 메서드 import
// import { doc, getDoc } from '@firebase/firestore';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} />
      </Routes>
    </Router>
  );
}
export default App;

// function App() {
//   const [test, setTest] = useState()
//   // async - await로 데이터 fetch 대기
//   async function getTest() {
//     // document에 대한 참조 생성
//     const docRef = doc(db, "items", "1");
//     // 참조에 대한 Snapshot 쿼리
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       setTest(docSnap.data())
//     }
//   };
//   // 최초 마운트 시에 getTest import
//   useEffect(() => {
//     getTest()
//   }, [])
//   return (
//     <div>
//         {test !== undefined &&
//         <div>{test.name}</div>}
//         <Home />
//     </div>
//   );
// }
// export default App;