import PropTypes from 'prop-types'; // E
import { Link, useParams} from 'react-router-dom';
import  {wrapper, container_purple, container_yellow, 
		container_green, container,  img_wrapper, active, button} from './NavItem.module.scss';

const NavItem = ({imgSrc, name, pageLink, backgroundColor}) => {
	let styleBackground;
	let isActive;

	switch(backgroundColor){
		case 'purple':
			styleBackground = container_purple;
			break;
		case 'yellow':
			styleBackground = container_yellow;
			break;
		case 'green':
			styleBackground = container_green;
			break;
		default:
			styleBackground = ''
	}

	return (
		<Link to={pageLink} className={wrapper} >
			 <div className={container + ' ' + styleBackground + ' ' + (isActive ? active : '')}>
				 <div className={img_wrapper}>
					 <img src={imgSrc} alt="navigation img"/>
				 </div>
			 </div>
			 <div className={button + ' ' + (isActive ? active : '')}>{name}</div>
		</Link>

	)
}
export default NavItem;

NavItem.propTypes = {
	imgSrc: PropTypes.string,
	name: PropTypes.string,
	pageLink: PropTypes.string,
	backgroundColor: PropTypes.string
}