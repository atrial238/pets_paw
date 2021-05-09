import PropTypes from  'prop-types';

import { Favourites } from '../Svg';
import {wrapper, cover} from './ImagePet.module.scss';
  
const ImagePet = ({imageUrl, key, removeFavourite, id}) => {
	
	return (
		<div key={key} className={wrapper}>
			<img src={imageUrl} alt="pet" />
			<div className={cover}>
					<button onClick={() =>removeFavourite(id)}><Favourites/></button>
			</div>
		</div>
	)
}
export default ImagePet;

ImagePet.propTypes = {
	imageUrl: PropTypes.string,
	key: PropTypes.string,
	removeFavourite: PropTypes.func,
	id: PropTypes.number
}