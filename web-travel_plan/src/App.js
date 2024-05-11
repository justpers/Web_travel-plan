// firebase.js에서 db를 import
import { db } from './Firebase';
import { useEffect, useState } from 'react';
// firestore의 메서드 import
import { doc, getDoc } from '@firebase/firestore';

function App() {
  const [test, setTest] = useState()
  // async - await로 데이터 fetch 대기
  async function getTest() {
    // document에 대한 참조 생성
    const docRef = doc(db, "items", "1");
    // 참조에 대한 Snapshot 쿼리
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTest(docSnap.data())
    }
  };
  // 최초 마운트 시에 getTest import
  useEffect(() => {
    getTest()
  }, [])
  return (
    <div>
        {test !== undefined &&
        <div>{test.name}</div>}
    </div>
  );
}

export default App;