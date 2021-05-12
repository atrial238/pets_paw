import { Select } from '../../../components';
import {MainActionButton} from '../../../components/Svg';

import {wrapper, select, select_update, wrapper_select_update, update} from './HeaderGallery.module.scss';

const HeaderGallery = ({propsSelectBeeds}) => {
	return (
		<div className={wrapper}>
			<div className={select}>
				<label htmlFor="order">order</label>
				<Select  selectValue='Random' background='light' items={['Random', 'Desc', 'Asc']}/>
			</div>
			<div className={select}>
				<label htmlFor="type">type</label>
				<Select selectValue='All' background='light' items={['All', 'Static', 'Animated']}/>
			</div>
			<div className={select}>
				<label htmlFor="breed">breed</label>
				<Select {...propsSelectBeeds}/>
			</div>
			<div className={select + ' ' + select_update}>
				<label htmlFor="limit"></label>
				<div className={wrapper_select_update}>
					<div  >update</div>
					<button><MainActionButton/></button>
				</div>
			</div>
		</div>
	)
}
export default HeaderGallery;