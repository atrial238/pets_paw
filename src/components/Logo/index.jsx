import {Link} from 'react-router-dom';

import logo from '../../assets/images/logo/logo.svg';
import {link} from './Logo.module.scss';

const Logo = () => <Link className={link} to='/'><img src={logo} alt="logo"/></Link>

export default Logo;