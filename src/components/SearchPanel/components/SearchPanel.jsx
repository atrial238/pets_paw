import {Link} from 'react-router-dom';
import { Formik } from 'formik';

import {wrapper, form, links_wrapper} from './SearchPanel.module.scss';
import Likes from './Likes';
import Dislikes from './Dislikes';
import Favourites from './Favourites';



const SearchPanel = () => {

	return (
		<div className={wrapper}>
				<Formik
					className={form}
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
						<form onSubmit={props.handleSubmit}>
							<input
								type="text"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.name}
								name="name"
							/>
							{/* {errors.name && touched.name && <div id="feedback">{errors.name}</div>} */}
							<button type="submit" >Submit</button>
						</form>
					)}
				</Formik>
			<div className={links_wrapper}>
				<Link to='/favourites'><Favourites/></Link>
				<Link to='/dislikes'><Likes/></Link> 
				<Link to='/likes'><Dislikes/></Link>
			</div>
		</div>
	)
}
export default SearchPanel;

{/* <Link to='/favourites'><img src={favourites} style={{fill: 'green'}} alt="favourites"/></Link> */}
{/* <Link to='/likes'><img src={likes} alt="likes"/></Link>
<Link to='/dislikes'><img src={dislikes} alt="dislikes"/></Link>  */}
