
import { Header } from '../../modules';
import {burger_menu, active} from './BurgerMenu.module.scss';

const BurgerMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, isBurgerMenuInNavPanel}) => {

	return (
		<div className={burger_menu + ' ' + (!isBurgerMenuInNavPanel && active)} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	)
}

export default BurgerMenu;