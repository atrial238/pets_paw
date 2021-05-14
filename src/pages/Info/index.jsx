import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { imageAPI } from "../../API/api";
import { BodyContainter, Placeholder, NavPanel } from "../../components";
import {  Header, InfoBody } from "../../modules";
import {error, Info_contant} from './Info.module.scss';

export const templateImageInfo = {

	breeds:[
		{
			bred_for: 'unknown',
			height: {metric: 'unknown'},
			id: 'unknown',
			life_span: 'unknown',
			name: 'unknown',
			temperament: 'unknown',
			weight: {metric: 'unknown'},
		}
	],
	id: '',
	url: ''
}

const Info = () => { 
	//define image id from url 
	const {imageId} = useParams();

	const [imageInfo, setImageInfo] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	
	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
	
		imageAPI.getSpecificImage(imageId)
			.then(res => {
				if(res === 'error'){
					setIsLoading(false);
					setIsError(true);
				}else{
					setIsLoading(false);
					setIsError(false);
					if(!res.breeds){
						templateImageInfo.id = res.id;
						templateImageInfo.url = res.url;
						setImageInfo(templateImageInfo);
					}else{
						setImageInfo(res)
					}
				}
			}
		)
		
	}, []);
	
	return (
		<div className='wrapper_page'>
			<Header/>
			<div>
				<NavPanel nameBackButton='info'/>
				<BodyContainter>
					<div className={Info_contant}>
					{isError 
						? <div className={error}>Oops! Something went wrong.</div>
						: (isLoading && <Placeholder/>) || <InfoBody imageInfo={imageInfo} />
					}
					</div>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Info;