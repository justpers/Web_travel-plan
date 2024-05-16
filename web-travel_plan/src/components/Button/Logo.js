// import styles from './Home.css';
// import React from 'react';

// class Button extends React.Component {
//   state = {
//     loading: false,
//   };
  
//   render() {
//     return <button onClick={ this.startLoading } className={this.state.loading ? `${styles["button"]} ${styles["loading"]}` : styles["button"]} { ... this.props } />; 
//   }
  
//   //event에 바인딩 되는 함수는 화살표함수를 사용해야 화살표함수 안에서 this를 사용할 수 있습니다.
//   startLoading = () => {
//     this.setState({ loading: true, });
//     setTimeout(() => {
//       this.setState({
//         loading: false,
//       });
//     }, 1000);
//   }
// }

// export default Button;