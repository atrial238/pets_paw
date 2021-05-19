import { BodyContainter, NavPanel } from "../../components";
import { useBusinessLayerMyDogs } from "../../hooks/useBusinessLayerMyDogs";
import useMobileMenu from "../../hooks/useMobileMenuOpen";
import { Header, MyDogsBody } from "../../modules";

const MyDogs = () => {

	//return state and all necessary function needed to manage that state 
	const propsMyDogsBody = useBusinessLayerMyDogs();
	
	//return isMobileMenuOpen and setMobileMenuOpen
	const propsForMangeMobielMenu = useMobileMenu();

	const {isMobileMenuOpen} = propsForMangeMobielMenu;

	const {state: {isUploadModalOpen}} = propsMyDogsBody;

	return (
		<div className={'wrapper_page' + ' ' + ((isMobileMenuOpen && 'freeze') || (isUploadModalOpen && 'freeze'))}>
			<Header {...propsForMangeMobielMenu}/>
			<div>
				<NavPanel nameBackButton='my dogs' propsForMangeMobielMenu={propsForMangeMobielMenu}/>
				<BodyContainter>
					<MyDogsBody {...propsMyDogsBody}/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default MyDogs;