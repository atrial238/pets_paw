import {useEffect, useState} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import { Formik } from 'formik';

import {wrapper, form, links_wrapper, button, favourites, active} from './SearchPanel.module.scss';
import {Likes, Search, Favourites, Dislikes} from '../Svg';

const SearchPanel = () => {
	const [isActiveFav, setIsActiveFav] = useState(''),
			[isActiveLikes, setIsActiveLikes] = useState(''),
			[isActiveDislikes, setIsActiveDislikes] = useState('');

	const path = useRouteMatch().path;
	useEffect(() => {

		switch(path){
			case '/favourites':
				setIsActiveFav(active);
				break;
			case '/likes':
				setIsActiveLikes(active);
				break;
			case '/dislikes':
				setIsActiveDislikes(active);
				break;
			default:
		}
	}, [path])
	
	return (
		<div className={wrapper}>
				<Formik
					initialValues={{ name: '' }}
					onSubmit={(values, actions) => {
						console.log(1)
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
							/>
							{/* {errors.name && touched.name && <div id="feedback">{errors.name}</div>} */}
							<button type="submit"  className={button}><Search/></button>
						</form>
					)}}
				</Formik>
			<div className={links_wrapper}>
				<Link to='/dislikes' className={button + ' ' + isActiveLikes}><Likes/></Link>
				<Link to='/favourites' className={button + ' ' + favourites + ' ' +isActiveFav }><Favourites/></Link>
				<Link to='/likes' className={button + ' ' + isActiveDislikes}><Dislikes/></Link>
			</div>
		</div>
	)
}
export default SearchPanel;