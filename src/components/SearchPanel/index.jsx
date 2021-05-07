import {Link} from 'react-router-dom';
import { Formik } from 'formik';

import {wrapper, form, links_wrapper, button, favourites} from './SearchPanel.module.scss';
import {Likes, Search, Favourites, Dislikes} from '../Svg';

const SearchPanel = () => {

	return (
		<div className={wrapper}>
				<Formik
					initialValues={{ name: 'jared' }}
					onSubmit={(values, actions) => {
						console.log(1)
					  setTimeout(() => {
						 alert(JSON.stringify(values, null, 2));
						 actions.setSubmitting(false);
					  }, 1000);
					}}
				>
					{props => (
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
					)}
				</Formik>
			<div className={links_wrapper}>
				<Link to='/dislikes' className={button}><Likes/></Link>
				<Link to='/favourites' className={button + ' ' + favourites}><Favourites/></Link>
				<Link to='/likes' className={button}><Dislikes/></Link>
			</div>
		</div>
	)
}
export default SearchPanel;