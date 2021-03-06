import React from 'react';
import { breedsAPI, imageAPI } from "../../API/api";
import { BodyContainter, NavPanel } from "../../components";
import { useBusinessLayerGallery } from "../../hooks/useBusinessLayerGallery";
import useMobileMenu from '../../hooks/useMobileMenuOpen';
import { GalleryBody, Header } from "../../modules";
import {wrapper, freeze} from './Gallery.module.scss';

const Gallery = () => {

	//return state and all necessary function needed to manage that state 
	const propsBreedsBody = useBusinessLayerGallery(breedsAPI.getBreeds, imageAPI.getImageByBreed, true);

	//return isMobileMenuOpen and setMobileMenuOpen
	const propsForMangeMobielMenu = useMobileMenu();

	const {isMobileMenuOpen} = propsForMangeMobielMenu;

	return (
		<div className={'wrapper_page' + ' ' + (isMobileMenuOpen && 'freeze')}>
			<Header {...propsForMangeMobielMenu}/>
			<div className={wrapper + ' ' + (isMobileMenuOpen && freeze)}>
				<NavPanel nameBackButton='gallery' propsForMangeMobielMenu={propsForMangeMobielMenu}/>
				<BodyContainter>
					<GalleryBody {...propsBreedsBody} />
				</BodyContainter>
			</div>
		</div>
	)
}
export default React.memo(Gallery);