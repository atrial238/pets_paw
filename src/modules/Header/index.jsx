import React from 'react';
import { Greetings, Logo, NavItem } from '../../components';
import {wrapper, navigation, logo, greetings} from './Header.module.scss';

import petBreeds from '../../assets/images/Navigation/pet-breeds.png';
import voteTable from '../../assets/images/Navigation/vote-table.png';
import imagesSearch from '../../assets/images/Navigation/images-search.png';

const Header = () => {
	return (
		<div className={wrapper}>
			<div className={logo}><Logo/></div>
			<div className={greetings}><Greetings/></div>
			<nav className={navigation}>
				<NavItem imgSrc={voteTable} name='voting' pageLink='/voting' backgroundColor='purple'/>
				<NavItem imgSrc={petBreeds} name='breeds' pageLink='/breeds' backgroundColor='green'/>
				<NavItem imgSrc={imagesSearch} name='gallery' pageLink='/gallery' backgroundColor='yellow'/>
			</nav>
		</div>
	)
}
export default  React.memo(Header); 