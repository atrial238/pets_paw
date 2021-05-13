import React from 'react';
import { breedsAPI, imageAPI } from "../../API/api";
import { BodyContainter, SearchPanel } from "../../components";
import { useBusinessLayerGallery } from "../../hooks/useBusinessLayerGallery";
import { BreedsBody, Header } from "../../modules";
import {wrapper} from './Breeds.module.scss';

const Breeds = () => { 

	const propsBreedsBody = useBusinessLayerGallery(breedsAPI.getBreeds, imageAPI.getImageByBreed);
	
	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<BreedsBody {...propsBreedsBody} />
				</BodyContainter>
			</div>
		</div>
	)
}
export default React.memo(Breeds);