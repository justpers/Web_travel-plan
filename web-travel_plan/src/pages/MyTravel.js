import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './MyTravel.module.css';
import logoImage from '../images/airplan.png';
import user from '../images/사용자 아이콘.png';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/Firebase';
import { collection, getDocs } from 'firebase/firestore';

const MyTravel = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userTripsRef = collection(db, 'users', user.uid, 'trips');
          const snapshot = await getDocs(userTripsRef);
          const tripsData = snapshot.docs.map(doc => doc.data());
          tripsData.sort((a, b) => b.start.seconds - a.start.seconds);
          setTrips(tripsData);
        }
      } catch (error) {
        console.error('여행 정보를 불러오는데 실패했습니다:', error);
      }
    };

    fetchTrips();
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date.seconds * 1000).toLocaleDateString('ko-KR', options);
  };

  const cityNameMap = {
    '아테네' : 'athens', '방콕' : 'bangkok', '바르셀로나' : 'barcelona',
    '베이징' : 'bejing', '부다페스트' : 'budapest', '세부' : 'cebu',
    '치앙마이' : 'chiang mai','다낭' : 'da nang', '두바이' : 'dubai', 
    '피렌체' : 'florence', '후쿠오카' : 'fukuoka', '괌' : 'guam', 
    '하와이' : 'hawaii', '헬싱키' : 'helsinki', '홍콩' : 'hong kong', 
    '인터라켄' : 'interlaken', '이스탄불' : 'istanbul', 
    '코타키나발루' : 'kota kinabalu', '라오스' : 'laos', '로스엔젤레스' : 'los angeles', 
    '마드리드' : 'madrid', '마닐라' : 'manila', '멜버른' : 'melbourne', 
    '밀라노' : 'milan', '뉴욕' : 'new york', '오사카' : 'osaka', '파리' : 'paris', 
    '푸꾸옥' : 'phu quoc', '포르투' : 'porto', '프라하' : 'prague', '로마' : 'rome', 
    '샌프란시스코' : 'san francisco', '세비야' : 'sevile', '상하이' : 'shanghai', 
    '싱가포르' : 'singapore', '시드니' : 'sydney', '타이페이' : 'taipei', '도쿄' : 'tokyo', 
    '빈' : 'vienna', '취리히' : 'zurich'
  };

  const getImagePath = (city) => {
    const englishCity = cityNameMap[city];
    try {
      return require(`../images/${englishCity}.jpg`);
    } catch (error) {
      console.error('이미지를 찾을 수 없습니다:', error);
      return '';
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
        <h1 className={styles.title}>my travel record</h1>
        <div className={styles.trips}>
          {trips.map((trip, index) => (
            <div key={index} className={styles.tripCard} onClick={() => navigate('/fixSchedule')}>
              <img src={getImagePath(trip.city)} alt={trip.city} className={styles.tripImage} />
              <div className={styles.tripDate}>{formatDate(trip.start)} - {formatDate(trip.end)}</div>
              <div className={styles.tripCity}>{cityNameMap[trip.city].toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTravel;