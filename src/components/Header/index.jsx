import logo from '../../assets/images/logo.svg'
import styles from './Header.module.css'

const Header = () => {
    return (
        <div className='container'>
            <header className={styles.header}>
                <img src={logo} className={styles.logo} alt="IMC Precision logo" />
                <h1 className={styles.name}>
                    IMC Precision
                </h1>
            </header>
        </div>
        
    )
}

export default Header