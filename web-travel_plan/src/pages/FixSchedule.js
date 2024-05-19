import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Myinterest.module.css';
import logoImage from '../images/airplan.png';
import user from '../images/사용자 아이콘.png';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/Firebase';

const FixSchedule = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

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
              {/* <div className={styles.dropdownItem}><Link to="/contact">문의하기</Link></div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FixSchedule;