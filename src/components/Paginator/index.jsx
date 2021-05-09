import PropTypes from 'prop-types';

import { Select } from ".."
import {wrapper, previous, next, disabled_style} from './Paginator.module.scss';

const Paginator = (props) => {

	const {setNextPage, setPreviousPage, page, isLastPage, isLoading, ...rest} = props;

	const propsPreviousButton = {
		className: previous + ' ' + (page === 0 || isLoading ? disabled_style : ''), 
		onClick(){setPreviousPage()},
		disabled: page === 0 || isLoading ? ' ' : ''
	}

	const propsNextButton = {
		className: next + ' ' + (isLastPage || isLoading ? disabled_style : ''),
		onClick(){setNextPage()},
		disabled: isLastPage || isLoading ? ' ' : ''
	}

	return (
		<div className={wrapper}>
			<button {...propsPreviousButton}>Previous</button>
			<Select background='dark' {...rest}/>
			<button {...propsNextButton}>Next</button>
		</div>
	)
}
export default Paginator;

Paginator.propTypes = {
	changeLimit: PropTypes.func,
	selectValue: PropTypes.string,
	setNextPage: PropTypes.func,
	setPreviousPage: PropTypes.func,
	page: PropTypes.number,
	isLastPage: PropTypes.bool,
	isLoading: PropTypes.bool,
	items: PropTypes.array,
}