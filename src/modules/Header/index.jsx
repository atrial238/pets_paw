import React from 'react';
import { BurgerMenu, Greetings, Logo, NavItem } from '../../components';
import {wrapper, navigation, logo, greetings, mobile_menu, home_page} from './Header.module.scss';

import petBreeds from '../../assets/images/Navigation/pet-breeds.png';
import voteTable from '../../assets/images/Navigation/vote-table.png';
import imagesSearch from '../../assets/images/Navigation/images-search.png';


const Header = ({isMobileMenuOpen, setIsMobileMenuOpen, isHome}) => {
	
	return (
		<div className={wrapper + ' ' + (isMobileMenuOpen && mobile_menu) + ' ' + (isHome && home_page)}>
			<div className={logo + ' ' + (isMobileMenuOpen && mobile_menu)}>
				<Logo/>
				{!isHome && <BurgerMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>}
			</div>
			{<div className={greetings}><Greetings/></div>}
			<nav className={navigation + ' ' + (isMobileMenuOpen && mobile_menu)}>
				<NavItem imgSrc={voteTable} name='voting' pageLink='/voting' backgroundColor='purple'/>
				<NavItem imgSrc={petBreeds} name='breeds' pageLink='/breeds' backgroundColor='green'/>
				<NavItem imgSrc={imagesSearch} name='gallery' pageLink='/gallery' backgroundColor='yellow'/>
			</nav>
		</div>
	)
}
export default  Header; 