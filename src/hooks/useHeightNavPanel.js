import { useEffect, useState } from "react";

const useHeightNavPanel = () => {
	
	const [heightNavPanel, setHeightNavPanel] = useState(0);
	const [isMobileView, setIsMobileView] = useState(window.matchMedia('(max-width: 992px)').matches);

	useEffect(() => {
		const updateIsMobileView = () => setIsMobileView(window.matchMedia('(max-width: 992px)'));
		const updateHeightNavPanel = () => setHeightNavPanel(document.querySelector('#nav_panel').clientHeight)
		updateHeightNavPanel();
		window.addEventListener('resize', updateIsMobileView);
		if(isMobileView) window.addEventListener('resize', updateHeightNavPanel);
			
		return () => {
			window.removeEventListener('resize', updateIsMobileView)
			window.removeEventListener('resize', updateHeightNavPanel)
		}

	}, [heightNavPanel, isMobileView]);

	return heightNavPanel;
}
export default useHeightNavPanel;