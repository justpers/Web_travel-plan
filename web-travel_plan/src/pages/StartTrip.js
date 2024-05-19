import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './StartTrip.module.css';
import logoImage from '../images/airplan.png';
import user from '../images/사용자 아이콘.png';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/Firebase';
import {collection, addDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StartTrip = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [trips, setTrips] = useState([]);

  const navigate = useNavigate();

  const cities = ['아테네', '방콕', '바르셀로나', '베이징', '부다페스트', '세부',
    '치앙마이', '다낭', '두바이', '피렌체', '후쿠오카', '괌', '하와이', '헬싱키',
    '홍콩', '인터라켄', '이스탄불', '코타키나발루', '라오스', '로스엔젤레스', '마드리드',
    '마닐라', '멜버른', '밀라노', '뉴욕', '오사카', '파리', '푸꾸옥', '포르투', 
    '프라하', '로마', '샌프란시스코', '세비야', '상하이', '싱가포르', '시드니',
    '타이페이', '도쿄', '빈', '취리히'
  ];

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCitySelect = () => {
    if (cities.includes(searchTerm)) {
      setSelectedCity(searchTerm);
    } else {
      alert('아직 등록되지 않은 도시입니다.');
    }
  };

  const handleAddTrip = () => {
    if (selectedCity && startDate && endDate) {
      setTrips([...trips, { city: selectedCity, start: startDate, end: endDate }]);
      setSelectedCity(null);
      setStartDate(null);
      setEndDate(null);
      setSearchTerm('');
    }
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '';
  };

  const handleComplete = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userTripRef = collection(db, 'users', user.uid, 'trips');
        for (const trip of trips) {
          await addDoc(userTripRef, trip);
        }
        console.log('여행정보가 db에 저장됨');
        navigate('/fixSchedule');
      }
    } catch (error) {
      console.error('여행 정보 저장에 실패', error);
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
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="도시 이름으로 검색해보세요."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <button onClick={handleCitySelect} className={styles.searchButton}>검색</button>
        </div>
        {selectedCity && (
          <div className={styles.datePicker}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              placeholderText="시작일을 선택하세요."
              className={styles.dateInput}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy/MM/dd"
              placeholderText="완료일을 선택하세요."
              className={styles.dateInput}
            />
            <button onClick={handleAddTrip} className={styles.addButton}>추가</button>
          </div>
        )}
        <div className={styles.tripList}>
          <table>
            <thead>
              <tr>
                <th>도시</th>
                <th>시작일</th>
                <th>완료일</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.city}</td>
                  <td>{formatDate(trip.start)}</td>
                  <td>{formatDate(trip.end)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className={styles.completeButton} onClick={handleComplete}>완료</button>
      </div>
    </div>
  );
}

export default StartTrip;
