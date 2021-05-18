import {useState} from 'react';

const useMobileMenu = () => {

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	

	return {
		isMobileMenuOpen,
		setIsMobileMenuOpen
	}
}

export default useMobileMenu;