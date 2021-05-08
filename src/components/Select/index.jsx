import PropTypes from 'prop-types';

import {select_light, select_dark} from './Select.module.scss';

const Select = ({background, items, selectValue, changeLimit}) => {

	


	let select;
	switch(background){
		case 'light':
			select = select_light;
			break;
		case 'dark':
			select = select_dark;
			break;
		default:
			select = '';
	}
	const option = items.map(el => <option value={el}>{el}</option>)

	return <select value={selectValue} className={select} onChange={changeLimit}>{option}</select>
}
export default Select;

Select.propTypes = {
	name: PropTypes.string,
	background: PropTypes.string,
	items: PropTypes.array
}