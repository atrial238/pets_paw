import React, {useEffect, useState} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';


import {wrapper, links_wrapper, button, favourites,
	 active, likes_dislikes, my_dog, back_button, } from './NavPanel.module.scss';
import {Likes, Favourites, Dislikes, MyDog} from '../Svg';
import { BackButton, BurgerMenu } from '..';


const NavPanel = ({nameBackButton, propsForMangeMobielMenu}) => {
	const [isActiveFav, setIsActiveFav] = useState(''),
			[isActiveLikes, setIsActiveLikes] = useState(''),
			[isActiveMyDog, setIsActiveMyDog] = useState('');
			
			

	const path = useRouteMatch().path;

	useEffect(() => {
		switch(path){
			case '/favourites':
				setIsActiveFav(active);
				break;
			case '/likes-and-dislikes':
				setIsActiveLikes(active);
				break;
			case '/my-dogs':
				setIsActiveMyDog(active);
				break
			default:
		}
	}, [path])
	

	return (
		<div className={wrapper}>
			<div className={back_button}><BackButton name={nameBackButton} /></div>
			<div className={links_wrapper}>
				<Link to='/likes-and-dislikes' className={button + ' ' + isActiveLikes + ' ' + likes_dislikes}><Likes/><Dislikes/></Link>
				<Link to='/favourites' className={button + ' ' + favourites + ' ' + isActiveFav }><Favourites/></Link>
				<Link to='/my-dogs' className={button + ' ' + my_dog + ' ' + isActiveMyDog }><MyDog/></Link>
				<BurgerMenu  isBurgerMenuInNavPanel={true} {...propsForMangeMobielMenu}/>
			</div>
		</div>
	)
}
export default React.memo(NavPanel);