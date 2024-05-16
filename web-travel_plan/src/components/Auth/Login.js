import React from 'react';
// import styles from './Login.module.css';

class Login extends React.Component {
    render() {
      return (
        <div>
            <h1>Login</h1>
            <nav>
                <a href="#myinterest">내 관심목록</a>
                <a href="#starttravel">여행 시작하기</a>
                <a href="#mytravel">내 여행</a>
            </nav>
        </div>
      );
    }
  }
  
  export default Login;