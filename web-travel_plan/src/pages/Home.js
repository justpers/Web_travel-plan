import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import logoImage from '../images/airplan.png';
import { auth } from '../utils/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.trim() && password.trim()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/login');
      } catch (error) {
        console.log("Error object: ", error);
        if (error.code === 'auth/wrong-password') {
          alert('비밀번호를 다시 확인해주세요.');
        } else if (error.code === 'auth/user-not-found') {
          alert('회원가입을 먼저 완료해주세요.');
        } else {
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } else {
      alert('이메일과 비밀번호를 모두 입력해주세요!');
    }
  };

  return (
    <div className={styles.main}>
      <img src={logoImage} alt="로고" className={styles.mini_logo} />
      <div className={styles.mini_service_name}><Link to="/">똑트래블</Link></div>
      <div className={styles.mainContent}>
        <div className={styles.main_title1}>
          여행의 시작부터 끝까지<span className={styles['text-style-1']}>똑똑</span>하게
        </div>
        <img src={logoImage} alt="로고" className={styles.logo} />
        <div className={styles.service_name}>똑트래블</div>
        <div className={styles.main_title2}>
          오직 <span className={styles['text-style-1']}>여행</span>에만 
          <span className={styles['text-style-1']}> 집중</span>할 수 있도록
        </div>
        <div className={styles.Rectangle1}>
          <form onSubmit={handleSubmit}>
            <div className={styles.LOGIN_text}>Login</div>
            <label htmlFor="email" className={styles.email}>이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            <label htmlFor="password" className={styles.pw}>비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            <div className={styles.forget_pw}>
              <Link to="/forgot-password">비밀번호를 잊으셨나요?</Link>
            </div>
            <button type="submit" className={styles.Rectangle4}>
              <div className={styles.text}>로그인</div>
            </button>
            <div className={styles.join}>
              아직 회원이 아니신가요?
              <div className={styles.join2}><Link to="/signup">이메일 회원가입</Link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;