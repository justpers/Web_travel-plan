import React from 'react';
import styles from './Signup.module.css';
import { Link } from 'react-router-dom';
import logoImage from '../images/airplan.png';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            authNum: '',
            password: '',
            confirmPassword: '',
            username: '',
            birthdate: ''
        };
    }

    saveEmail = (event) => {
        this.setState({email: event.target.value});
    };
    saveAuthNum = (event) => {
        this.setState({authNum: event.target.value});
    }
    savePassword = (event) => {
        this.setState({password: event.target.value});
    }
    saveConfirmPassword = (event) => {
        this.setState({confirmPassword: event.target.value});
    }
    saveUsername = (event) => {
        this.setState({username: event.target.value});
    }
    saveBirthdate = (event) => {
        this.setState({birthdate: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.email && this.state.authNum && this.state.password && this.state.confirmPassword && this.state.username && this.state.birthdate) {
            this.props.history.push('/signup2');
            console.log('Signup data:', this.state);
        } else {
            alert('빈 칸에 정보를 입력해주세요.');
        }
    };

    render() {
        return(
            <div className={styles.main}>
                <img src={logoImage} alt="로고" className={styles.mini_logo} />
                <div className={styles.mini_service_name}><Link to="/">똑트래블</Link></div>
                <div className={styles.Rectangle1}>
                    <div className={styles.join_text}>회원가입</div>
                    <div className={styles.text}>회원가입을 위해 정보를 입력해주세요</div>
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.span}>이메일</label>
                            <div className={styles.inputWithButton}>
                                <input 
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.saveEmail}
                                    className={styles.inputField}
                                />
                            </div>
                            <button type="button" className={styles.button}>
                                <div className={styles.text2}>인증번호 전송</div>
                            </button>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.span}>인증번호 확인</label>
                            <input 
                                type="authNum"
                                value={this.state.authNum}
                                onChange={this.saveAuthNum}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.span}>비밀번호</label>
                            <input 
                                type="password"
                                value={this.state.password}
                                onChange={this.savePassword}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.span}>비밀번호 확인</label>
                            <input 
                                type="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.saveConfirmPassword}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.span}>닉네임</label>
                            <input 
                                type="username"
                                value={this.state.username}
                                onChange={this.saveUsername}
                                className={styles.inputField}
                            />
                        </div>
                        <div>
                            <label className={styles.span}>생년월일</label>
                            <input 
                                type="birthdate"
                                value={this.state.birthdate}
                                onChange={this.saveBirthdate}
                                className={styles.inputField}
                            />
                        </div> 
                    </form>
                    <button className={styles.button2}>
                        <div className={styles.text3}><Link to='/signup2'>다음으로</Link></div>
                    </button>
                </div>
            </div>
        )
    }
}

export default Signup;