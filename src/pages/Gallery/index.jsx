import { breedsAPI, imageAPI } from "../../API/api";
import { BodyContainter, SearchPanel } from "../../components";
import { useBusinessLayerGallery } from "../../hooks/useBusinessLayerGallery";
import { GalleryBody, Header } from "../../modules";
import {wrapper} from './Gallery.module.scss';

const Gallery = ({setImageInfo, setnameBackButton}) => {

	const propsBreedsBody = useBusinessLayerGallery(breedsAPI.getBreeds, imageAPI.getImageByBreed, true);

	const handleImageInfo = (id) => {
		
		
			const imageInfo = propsBreedsBody.state.petImages.find(el => el.id === id);
			console.log(imageInfo)
			setImageInfo(imageInfo)
			setnameBackButton('gallery')
		
		
	}
	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<GalleryBody {...propsBreedsBody} handleImageInfo={handleImageInfo}/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Gallery;