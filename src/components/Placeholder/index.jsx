import placeholder from '../../assets/images/preloader/white_preloader_60.svg';
import {wrapper} from './Placeholder.module.scss';

const Placeholder = ({size}) => {
	
	return <div className={wrapper}><img src={placeholder} alt="placeholder" /></div>
}
export default Placeholder;