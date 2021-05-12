import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import Back from './Back';
import {wrapper, title, back_button } from './BackButton.module.scss';

const BackButton = ({name}) => {
	const history = useHistory();
	return (
		<div className={wrapper}>
			<div onClick={() => history.goBack()}  className={back_button}><Back/></div>
			<div className={title}>{name}</div>
		</div>  
	)
}
export default BackButton; 

BackButton.propTypes = {
	name: PropTypes.string,
}