import React from 'react';
import styles from './Signup2.module.css';
import { Link } from 'react-router-dom';
import logoImage from '../images/airplan.png';

class Signup extends React.Component {

    render() {
        return(
            <div className={styles.main}>
                <img src={logoImage} alt="로고" className={styles.mini_logo} />
                <div className={styles.mini_service_name}><Link to="/">똑트래블</Link></div>
                
            </div>
        )
    }
}

export default Signup;