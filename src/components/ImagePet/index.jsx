
import { Favourites } from '../Svg';
import {wrapper, cover} from './ImagePet.module.scss';
  
const ImagePet = ({imageUrl, key}) => {
	return (
		<div key={key} className={wrapper}>
			<img src={imageUrl} alt="pet" />
			<div className={cover}>
				<button><Favourites/></button>
			</div>
		</div>
	)
}
export default ImagePet;