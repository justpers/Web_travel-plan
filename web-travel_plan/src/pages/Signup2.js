import React from 'react';
import styles from './Signup2.module.css';
import { Link } from 'react-router-dom';
import logoImage from '../images/airplan.png';

class Signup2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedPersonal: false,
            checkedTerms: false,
        };
    }

    handlePersonalChange = () => {
        this.setState({checkedPersonal: !this.state.checkedPersonal});
    };
    handleTermsChange = () => {
        this.setState({checkedTerms: !this.state.checkedTerms});
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const { checkedPersonal, checkedTerms } = this.state;
        if (checkedPersonal && checkedTerms) {
            alert('회원가입이 완료되었습니다.');
        } else {
            alert('필수 항목에 모두 동의해주세요.');
        }
    };

    render() {
        return(
            <div className={styles.main}>
                <img src={logoImage} alt="로고" className={styles.mini_logo} />
                <div className={styles.mini_service_name}><Link to="/">똑트래블</Link></div>

                <div className={styles.main}>
                    <div className={styles.Rectangle1}>
                        <div className={styles.text1}>똑트래블 회원 약관 동의</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className={styles.formGoup}>
                                <input
                                    type="checkbox"
                                    id="personal"
                                    checked={this.state.checkedPersonal}
                                    onChange={this.handlePersonalChange}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="personal" className={styles.label}>
                                    개인정보 수집에 동의합니다. <span className={styles.required}>(필수)</span>
                                </label>
                                <Link to="/privacy" className={styles.link}>보기</Link>
                            </div>
                            <div className={styles.termsBox}>
                                <p className={styles.termsTitle}>개인정보 수집</p>
                                <p className={styles.termsText}><strong>목적</strong> 개인식별, 회원자격 유지.관리</p>
                                <p className={styles.termsText}><strong>항목</strong> 이메일, 닉네임, 비밀번호, 생년월일</p>
                                <p className={styles.termsText}><strong>보유기간</strong> 회원탈퇴 시 즉시 파기</p>
                            </div>
                            <div className={styles.formGroup}>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={this.state.checkedTerms}
                                    onChange={this.handleTermsChange}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="terms" className={styles.label}>
                                    이용약관에 동의합니다. <span className={styles.required}>(필수)</span>
                                </label>
                                <Link to="/terms" className={styles.link}>보기</Link>
                                </div>
                                <button type="submit" className={styles.button}>
                                    <Link to="/">회원가입 완료</Link>
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup2;