import React from 'react';
import { breedsAPI, imageAPI } from "../../API/api";
import { BodyContainter, SearchPanel } from "../../components";
import { useBusinessLayerGallery } from "../../hooks/useBusinessLayerGallery";
import { GalleryBody, Header } from "../../modules";
import {wrapper} from './Gallery.module.scss';

const Gallery = () => {
	const propsBreedsBody = useBusinessLayerGallery(breedsAPI.getBreeds, imageAPI.getImageByBreed, true);
	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<GalleryBody {...propsBreedsBody} />
				</BodyContainter>
			</div>
		</div>
	)
}
export default React.memo(Gallery);