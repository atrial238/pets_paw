import { Select } from '../../../components';
import {MainActionButton} from '../../../components/Svg';

import {wrapper, select, select_update, wrapper_select_update} from './HeaderGallery.module.scss';

const HeaderGallery = ({propsSelectBeeds}) => {
	const {
		items,
		selectValueBreeds,
		selectValueOrder,
		selectValueType,
		handleCurrentBreedForGallery,
		handleOrderBreedForSearch,
		handleTypeBreedForSearch,
		updateSearch
	} = propsSelectBeeds;
	return (
		<div className={wrapper}>
			<div className={select}>
				<label htmlFor="order">order</label>
				<Select selectValue={selectValueOrder} background='light' items={['Random', 'Desc', 'Asc']} handleChange={handleOrderBreedForSearch}/>
			</div>
			<div className={select}>
				<label htmlFor="type">type</label>
				<Select selectValue={selectValueType} background='light' items={['All', 'Static', 'Animated']} handleChange={handleTypeBreedForSearch}/>
			</div>
			<div className={select}>
				<label htmlFor="breed">breed</label>
				<Select items={items} selectValue={selectValueBreeds} handleChange={handleCurrentBreedForGallery} background='light'/>
			</div>
			<div className={select + ' ' + select_update} onClick={updateSearch}>
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