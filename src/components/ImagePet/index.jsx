import PropTypes from  'prop-types';
import { Dislikes, Likes } from '../Svg';
import {wrapper, cover, icon_red, icon_green, icon_none} from './ImagePet.module.scss';
  
const ImagePet = ({imageUrl, key, removeFavourite, id, value }) => {
	let icon, iconSvg, text;
	
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
		default:
			icon = icon_none;
			text = 'Favourite';
	};

	return (
		<div key={key} className={wrapper}>
			<img src={imageUrl} alt="pet" />
			<div className={cover}>
				<button onClick={() => removeFavourite(id)}>{`Remove from ${text}`}</button>
			</div>
			<div className={icon}>{iconSvg}</div>
		</div>
	)
}
export default ImagePet;

ImagePet.propTypes = {
	imageUrl: PropTypes.string,
	key: PropTypes.string,
	removeFavourite: PropTypes.func,
	id: PropTypes.number,
	typeVote: PropTypes.string
}