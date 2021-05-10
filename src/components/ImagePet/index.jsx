import PropTypes from  'prop-types';
import { Dislikes, Likes } from '../Svg';
import {wrapper, cover, icon_red, icon_green, icon_none} from './ImagePet.module.scss';
  
const ImagePet = ({imageUrl, key, handleImageEvent, id, value, nameBreed}) => {
	let icon, iconSvg, text, prefix;
	
	switch(value){
		case 0:
			icon = icon_red;
			iconSvg = <Dislikes/>;
			text= 'Dislikes'
			break;
		case 1:
			icon = icon_green;
			iconSvg = <Likes/>;
			text = 'Likes'
			break;
		case 2:
			icon = icon_none;
			text = '';
			prefix = nameBreed;
			break;
		default:
			icon = icon_none;
			text = 'Favourite';
			prefix = 'Remove from'
	};

	return (
		<div key={key} className={wrapper}>
			<img src={imageUrl} alt="pet" />
			<div className={cover}>
				<button onClick={() => handleImageEvent(id, true)}>{`${prefix} ${text}`}</button>
			</div>
			<div className={icon}>{iconSvg}</div>
		</div>
	)
}
export default ImagePet;

ImagePet.propTypes = {
	imageUrl: PropTypes.string,
	key: PropTypes.string,
	handleImageEvent: PropTypes.func,
	id: PropTypes.number,
	typeVote: PropTypes.string
}