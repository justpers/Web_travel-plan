import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './TripDetail.module.css';
import logoImage from '../images/airplan.png';
import user from '../images/사용자 아이콘.png';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/Firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { toPng } from 'html-to-image';
import 'react-datepicker/dist/react-datepicker.css';

const TripDetail = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ time: '', place: '', category: '', budget: 0 });
  const [selectedDate, setSelectedDate] = useState('');
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { startDate, endDate, city, tripId } = location.state || {};
  const scheduleRef = useRef();

  useEffect(() => {
    const generateDates = (start, end) => {
      const dates = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    };

    if (startDate && endDate) {
      const start = new Date(startDate.seconds * 1000);
      const end = new Date(endDate.seconds * 1000);
      const datesArray = generateDates(start, end);
      setDates(datesArray);
      setSelectedDate(datesArray[0].toISOString().split('T')[0]);
    }
  }, [startDate, endDate]);

  const fetchSchedules = async (date) => {
    try {
      const schedulesRef = collection(db, 'users', auth.currentUser.uid, 'trips', tripId, 'schedules');
      const q = query(schedulesRef, where('date', '==', date));
      const snapshot = await getDocs(q);
      const schedulesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      schedulesData.sort((a, b) => a.time.localeCompare(b.time)); // 시간 순으로 정렬
      setSchedules(schedulesData);
    } catch (error) {
      console.error('일정을 불러오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchSchedules(selectedDate);
    }
  }, [selectedDate, tripId]);

  const handleAddSchedule = async () => {
    try {
      const schedulesRef = collection(db, 'users', auth.currentUser.uid, 'trips', tripId, 'schedules');
      const docRef = await addDoc(schedulesRef, { ...newSchedule, date: selectedDate });
      const newSchedules = [...schedules, { ...newSchedule, id: docRef.id, date: selectedDate }];
      newSchedules.sort((a, b) => a.time.localeCompare(b.time)); // 추가 후 시간 순으로 정렬
      setSchedules(newSchedules);
      setNewSchedule({ time: '', place: '', category: '', budget: 0 });
      console.log('일정이 추가되었습니다.');
    } catch (error) {
      console.error('일정을 추가하는데 실패했습니다:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleExport = async () => {
    if (scheduleRef.current) {
      const dataUrl = await toPng(scheduleRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${selectedDate}-schedule.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={styles.main}>
      <img src={logoImage} alt="로고" className={styles.mini_logo} />
      <div className={styles.mini_service_name}><Link to="/login">똑트래블</Link></div>
      <div className={styles.menubar}>
        <div className={styles.menubar_a}><Link to='/myinterest'>내 관심목록</Link></div>
        <div className={styles.menubar_a}><Link to='/startTrip'>여행 시작하기</Link></div>
        <div className={styles.menubar_a}><Link to='/myTravel'>내 여행</Link></div>
        <div className={styles.userIconContainer}>
          <img src={user} alt="사용자 아이콘" className={styles.user} onClick={toggleDropdown} />
          {dropdownVisible && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={handleLogout}>로그아웃</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{city} 여행 계획</h1>
        <div>
          <select id="dateSelect" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            {dates.map((date, index) => (
              <option key={index} value={date.toISOString().split('T')[0]}>
                {date.toLocaleDateString('ko-KR')}
              </option>
            ))}
          </select>
          <input
            type="time"
            placeholder="시간"
            value={newSchedule.time}
            className={styles.inputbox}
            onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
          />
          <input
            type="text"
            placeholder="장소"
            value={newSchedule.place}
            className={styles.inputbox}
            onChange={(e) => setNewSchedule({ ...newSchedule, place: e.target.value })}
          />
          <select
            value={newSchedule.category}
            className={styles.inputbox}
            onChange={(e) => setNewSchedule({ ...newSchedule, category: e.target.value })}
          >
            <option value="">카테고리</option>
            <option value="식당">식당</option>
            <option value="숙소">숙소</option>
            <option value="관광명소">관광명소</option>
            <option value="이동">이동</option>
            <option value="쇼핑">쇼핑</option>
          </select>
          <input
            type="number"
            placeholder="예산"
            value={newSchedule.budget}
            className={styles.inputbox}
            onChange={(e) => setNewSchedule({ ...newSchedule, budget: e.target.value })}
          />
          <button className={styles.button} onClick={handleAddSchedule}>추가</button>
        </div>
        <div ref={scheduleRef}>
          {schedules.map((schedule, index) => (
            <div key={index} className={styles.scheduleContent} >
              <p>{schedule.date} - {schedule.time} - {schedule.place} - {schedule.category} - {schedule.budget}</p>
            </div>
          ))}
        </div>
      </div>
      <button className={styles.outputbutton} onClick={handleExport}>내보내기</button>
      <button className={styles.button2}><Link to="/budget">가계부</Link></button>
    </div>
  );
}

export default TripDetail;