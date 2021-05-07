import { Select } from '../../../components';
import {MainActionButton} from '../../../components/Svg';

import {wrapper, select, select_limit, wrapper_select_limit} from './HeaderGallery.module.scss';

const HeaderGallery = () => {
	return (
		<div className={wrapper}>
			<div className={select}>
				<label htmlFor="order">order</label>
				<Select  name='Random' background='light' items={['Desc', 'Asc']}/>
			</div>
			<div className={select}>
				<label htmlFor="type">type</label>
				<Select name='Static' background='light' items={['All', 'Animated']}/>
			</div>
			<div className={select}>
				<label htmlFor="breed">breed</label>
				<Select name='None' background='light' items={['All', 'All', 'All', 'All', 'All', 'All', 'All', 'All', 'All']}/>

			</div>
			<div className={select + ' ' + select_limit}>
				<label htmlFor="limit">limit</label>
				<div className={wrapper_select_limit}>
					<div><Select name='5 items per page' background='light' items={['10 items per page', '15 items per page', '20 items per page']}/></div>
					<button ><MainActionButton/></button>
				</div>
			</div>
		</div>
	)
}
export default HeaderGallery;