import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './FixSchedule.module.css';
import logoImage from '../images/airplan.png';
import user from '../images/사용자 아이콘.png';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const FixSchedule = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [recommendedPlaces, setRecommendedPlaces] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { startDate, endDate, city } = location.state || {};

  // 로그를 통해 데이터 확인
  console.log("Received startDate:", startDate);
  console.log("Received endDate:", endDate);
  console.log("Received city:", city);

  const validStartDate = startDate ? new Date(startDate.seconds * 1000) : new Date();
  const validEndDate = endDate ? new Date(endDate.seconds * 1000) : new Date();

  console.log("Valid startDate:", validStartDate);
  console.log("Valid endDate:", validEndDate);

  useEffect(() => {
    const fetchRecommendedPlaces = async () => {
      try {
        const q = query(collection(db, 'recommended_places'), where('city', '==', city));
        const snapshot = await getDocs(q);
        const places = snapshot.docs.map(doc => doc.data());
        setRecommendedPlaces(places);
      } catch (error) {
        console.error('Error fetching recommended places:', error);
      }
    };

    if (city) {
      fetchRecommendedPlaces();
    }
  }, [city]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (date.getDay() === 0) {
        return styles.sunday;
      }
      if (date.getDay() === 6) {
        return styles.saturday;
      }
      if (validStartDate <= new Date(dateStr) && new Date(dateStr) <= validEndDate) {
        return styles.highlight; // highlight 클래스를 사용하여 하이라이트 색을 변경
      }
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (new Date(startDate) <= new Date(dateStr) && new Date(dateStr) <= new Date(endDate)) {
        return <div className={styles.highlight} />;
      }
    }
    return null;
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // 로그아웃 후 메인 페이지로 이동
    } catch (error) {
      console.error('로그아웃 실패:', error);
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

      <div className={styles.contentContainer}>
        <div className={styles.leftContainer}>
          <Calendar
            className={styles.calendar}
            tileClassName={tileClassName}
            tileContent={tileContent}
            defaultValue={[validStartDate, validEndDate]}
          />
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.buttons}>
            <button className={styles.completeButton}>
              <Link to="/fixSchedule">여행도시 / 날짜 수정</Link>
            </button>
            <button className={styles.completeButton}>
              <Link to="/tripDetail">세부계획 짜기</Link>
            </button>
          </div>
          <h2>a recommended place</h2>
          <table className={styles.recommendationTable}>
            <thead>
              <tr>
                <th>장소</th>
                <th>나라</th>
                <th>도시</th>
                <th>카테고리</th>
              </tr>
            </thead>
            <tbody>
              {recommendedPlaces.map((place, index) => (
                <tr key={index}>
                  <td>{place.name}</td>
                  <td>{place.country}</td>
                  <td>{place.city}</td>
                  <td>{place.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FixSchedule;
