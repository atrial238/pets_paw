import React, {useEffect, useState} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import { Formik } from 'formik';

import {wrapper, form, links_wrapper, button, favourites, active, likes_dislikes, my_dog} from './SearchPanel.module.scss';
import {Likes, Search, Favourites, Dislikes, MyDog} from '../Svg';

const SearchPanel = () => {
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
				<Formik
					initialValues={{ name: '' }}
					onSubmit={(values, actions) => {
					  setTimeout(() => {
						 alert(JSON.stringify(values, null, 2));
						 actions.setSubmitting(false);
					  }, 1000);
					}}
				>
					{props => {
						
						return (
						<form onSubmit={props.handleSubmit} className={form}>
							<input
								type="text"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.name}
								name="name"
								placeholder='Search for breeds by name'
							/>
							{/* {errors.name && touched.name && <div id="feedback">{errors.name}</div>} */}
							<button type="submit"  className={button}><Search/></button>
						</form>
					)}}
				</Formik>
			<div className={links_wrapper}>
				<Link to='/likes-and-dislikes' className={button + ' ' + isActiveLikes + ' ' + likes_dislikes}><Likes/><Dislikes/></Link>
				<Link to='/favourites' className={button + ' ' + favourites + ' ' + isActiveFav }><Favourites/></Link>
				<Link to='/my-dogs' className={button + ' ' + my_dog + ' ' + isActiveMyDog }><MyDog/></Link>
			</div>
		</div>
	)
}
export default React.memo(SearchPanel);