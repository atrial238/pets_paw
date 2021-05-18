import React from 'react';
import { breedsAPI, imageAPI } from "../../API/api";
import { BodyContainter, NavPanel } from "../../components";
import { useBusinessLayerGallery } from "../../hooks/useBusinessLayerGallery";
import useMobileMenu from '../../hooks/useMobileMenuOpen';
import { BreedsBody, Header } from "../../modules";
import {wrapper} from './Breeds.module.scss';

const Breeds = () => { 

	//return state and all necessary function needed to manage that state 
	const propsBreedsBody = useBusinessLayerGallery(breedsAPI.getBreeds, imageAPI.getImageByBreed);

	//return isMobileMenuOpen and setMobileMenuOpen
	const propsForMangeMobielMenu = useMobileMenu();
	
	return (
		<div className='wrapper_page'>
			<Header {...propsForMangeMobielMenu}/>
			<div className={wrapper}>
				<NavPanel nameBackButton='breeds' propsForMangeMobielMenu={propsForMangeMobielMenu}/>
				<BodyContainter>
					<BreedsBody {...propsBreedsBody} />
				</BodyContainter>
			</div>
		</div>
	)
}
export default React.memo(Breeds);