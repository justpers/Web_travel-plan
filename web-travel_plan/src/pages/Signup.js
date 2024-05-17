import React, { useState } from 'react';
import styles from './Signup.module.css';
import { Link } from 'react-router-dom';
import { auth, db } from '../utils/Firebase';
import { createUserWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import logoImage from '../images/airplan.png';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [error, setError] = useState('');

    const saveEmail = (event) => {
        setEmail(event.target.value);
    };

    const savePassword = (event) => {
        setPassword(event.target.value);
    };

    const saveConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const saveUsername = (event) => {
        setUsername(event.target.value);
    };

    const saveBirthdate = (event) => {
        setBirthdate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !confirmPassword || !username || !birthdate) {
            setError('모든 항목을 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            setError('비밀번호를 다시 확인해주세요.');
            return;
        }

        try {
            // 사용자 생성
            await createUserWithEmailAndPassword(auth, email, password);

            // Firestore에 사용자 정보 저장
            await setDoc(doc(db, 'users', email), {
                username: username,
                birthdate: birthdate,
            });

            // 이메일 인증 링크 보내기
            const actionCodeSettings = {
                url: 'http://localhost:3000/signup2',
                handleCodeInApp: true,
            };
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);

            alert('인증 이메일이 전송되었습니다. 이메일을 확인해주세요.');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.main}>
            <img src={logoImage} alt="로고" className={styles.mini_logo} />
            <div className={styles.mini_service_name}><Link to="/">똑트래블</Link></div>
            <div className={styles.Rectangle1}>
                <div className={styles.join_text}>회원가입</div>
                <div className={styles.text}>회원가입을 위해 정보를 입력해주세요</div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.span}>이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={saveEmail}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.span}>비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={savePassword}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.span}>비밀번호 확인</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={saveConfirmPassword}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.span}>닉네임</label>
                        <input
                            type="text"
                            value={username}
                            onChange={saveUsername}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.span}>생년월일</label>
                        <input
                            type="text"
                            value={birthdate}
                            onChange={saveBirthdate}
                            className={styles.inputField}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button2}>
                        <div className={styles.text3}>다음으로</div>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;