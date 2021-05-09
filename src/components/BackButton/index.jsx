import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Back from './Back';
import {wrapper, title } from './BackButton.module.scss';

const BackButton = ({name}) => {
	
	return (
		<div className={wrapper}>
			<Link to='/' ><Back/></Link>
			<div className={title}>{name}</div>
		</div>  
	)
}
export default BackButton; 

BackButton.propTypes = {
	name: PropTypes.string,
}