import React from 'react';
import { Link} from 'react-router-dom';
import styles from './Home.module.css';
import logoImage from '../images/airplan.png';

class Home extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
    if (email.trim() && password.trim()) {
      console.log("Login with:", email, password);
    } else {
      alert("이메일과 비밀번호를 모두 입력해주세요!");
    }
  };
  
  render() {
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
            <form onSubmit={this.handleSubmit}>
              <div className={styles.LOGIN_text}>Login</div>
              
              <label htmlFor="email" className={styles.email}>이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className={styles.inputField}
              />

              <label htmlFor="password" className={styles.pw}>비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className={styles.inputField}
              />

              <div className={styles.forget_pw}>
                <Link to="/forgot-password">비밀번호를 잊으셨나요?</Link>
              </div>

              <button type="submit" className={styles.Rectangle4}>
                <div className={styles.text}><Link to="/login">로그인</Link></div>
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
  }
}

export default Home;