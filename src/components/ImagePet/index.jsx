import {Link} from 'react-router-dom';
import PropTypes from  'prop-types';
import { Dislikes, Likes } from '../Svg';
import {wrapper, cover, icon_red, icon_green, icon_none} from './ImagePet.module.scss';
  
const ImagePet = ({imageUrl, handleImageEvent, id,  nameBreed, isImageOpenInNewPage, imageId, value, isGalleryPage}) => {

	let icon, iconSvg, text, prefix, targetValue;
	
	switch(value){
		case 0:
			icon = icon_red;
			iconSvg = <Dislikes/>;
			text= 'Dislikes'
			targetValue = id;
			break;
		case 1:
			icon = icon_green;
			iconSvg = <Likes/>;
			text = 'Likes'
			targetValue = id;
			break;
		case 2:
			icon = icon_none;
			text = '';
			prefix = nameBreed;
			targetValue = nameBreed;
			break;
		case 3:
			icon = icon_none;
			text = '';
			prefix = nameBreed;
			targetValue = imageId;
			break;
		default:
			icon = icon_none;
			text = 'Favourite';
			prefix = 'Remove from';
			targetValue = id;
	};
	const rootPath = isGalleryPage ? 'gallery' : 'breeds'
	return (
		<div  className={wrapper}>
			<img src={imageUrl} alt="pet" />
			<div className={cover}>
				{isImageOpenInNewPage 
					? <Link to={`/info/${imageId}`}><button >{`${prefix} ${text}`}</button></Link>
					: <button onClick={() => handleImageEvent(targetValue)}>{`${prefix} ${text}`}</button>
				}
				
			</div>
			<div className={icon}>{iconSvg}</div>
		</div>
	)
}
export default ImagePet;

ImagePet.propTypes = {
	imageUrl: PropTypes.string,
	handleImageEvent: PropTypes.func,
	id: PropTypes.number,
	typeVote: PropTypes.string,
	isImageOpenInNewPage: PropTypes.bool
}