import { format } from 'date-fns';
import {useReducer, useEffect} from 'react';
import { imageAPI } from '../API/api';
import placeholder from '../assets/images/uploadImagas/placeholder.png';

export const useBusinessLayerMyDogs = () => {

	const initState = {
		page: 0,
		myPetsImages: [],
		limit: 'Limit: 5',
		isLastPage: false,
		isLoading: false,
		isError: false,
		items: ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'],
		isUploadModalOpen: false,
		tempoPathUploadPicture: placeholder,
		imageForUpload: '',
		nameUploadImage: 'no file selected',
		isUploadingSuccess: false,
		isDeleteSuccess: false,
		isUpdateMyPetsImage: false,
		idDeletedImage: 'unknown',
		isUploadingImageWrong: false
	}

	const reducer = (state = initState, {type, body}) =>  {
		switch(type){
			case 'NEXT_PAGE':
				return {...state, page: ++state.page};
			case 'PREVIOUS_PAGE':
				return {...state, page: --state.page};
			case 'SET_PAGE_ZERO':
				return {...state, page: 0};
			case 'SET_LIMIT':
				return {...state, limit: body};
			case 'SET_MY_PETS_IMAGES':
				return {...state, myPetsImages: body};
			case 'SET_LAST_PAGE':
				return {...state, isLastPage: body};
			case 'SET_IS_LOADING':
				return {...state, isLoading: body};
			case 'SET_IS_ERROR':
				return {...state, isError: body};
			case 'SET_IS_UPLOAD_MODAL_OPEN':
				return {...state, isUploadModalOpen: body};
			case 'SET_TEMPO_PATH_UPLOAD_PICTURE':
				return {...state, tempoPathUploadPicture: body};
			case 'RESET_TEMPO_PATH_UPLOAD_PICTURE':
				return {...state, tempoPathUploadPicture: placeholder};
			case 'SET_IMAGE_FOR_UPLOAD':
				return {...state, imageForUpload: body};
			case 'SET_NAME_UPLOAD_IMAGE':
				return {...state, nameUploadImage: body};
			case 'SET_IS_UPLOADING_SUCCESS':
				return {...state, isUploadingSuccess: body};
			case 'SET_IS_DELETE_SUCCESS':
				return {...state, isDeleteSuccess: body};
			case 'SET_IS_UPDATE_MY_IMAGES':
				return {...state, isUpdateMyPetsImage: body};
			case 'SET_ID_DELETED_IMAGE':
				return {...state, idDeletedImage: body};
			case 'SET_IS_UPLOADING_IMAGE_WRONG': 
				return {...state, isUploadingImageWrong: body};
			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(reducer, initState)

//fomat time using the data-fns library, this is need for success message when delete or upload favourite
	const getTime = () => format(new Date(), "k':'mm");
	
//initialize my favourites, likes or dislikes pet, handle error, set preloader
	useEffect(() => {

		const limit = +state.limit.match(/.{1,2}$/g)[0];
		dispatch({type: 'SET_IS_LOADING', body: true});
		dispatch({type: 'SET_IS_ERROR', body: false})
		imageAPI.getMyImages(limit, state.page)
			.then(res => {
				if(res.length === 0){
					dispatch({type: 'SET_LAST_PAGE', body: true});
					dispatch({type: 'SET_IS_LOADING', body: false});
				}else if(res === 'error'){
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: true});
				}else{
					dispatch({type: 'SET_MY_PETS_IMAGES', body: res});
					dispatch({type: 'SET_LAST_PAGE', body: false});
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: false});
				}
			})
	}, [state.page, state.limit, state.isUpdateMyPetsImage]);

//functions for manage pagination
	const setNextPage = () => dispatch({type: 'NEXT_PAGE'});
	const setPreviousPage = () => dispatch({type: 'PREVIOUS_PAGE'});
	const changeLimit = (event) => {
		dispatch({type: 'SET_PAGE_ZERO'})
		dispatch({type: 'SET_LIMIT', body: event.target.value})
	};
	
//upload images or delete image
	const handleUploadDeleteImages = (file, typeEvent) => {
		//define what kind of method API should use
		const methodAPI = typeEvent ? imageAPI.uploadImages : imageAPI.deleteMyImage;

		dispatch({type: 'SET_IS_LOADING', body: true});
		dispatch({type: 'SET_IS_ERROR', body: false});
		dispatch({type: 'SET_IS_UPLOADING_SUCCESS', body: false});
		dispatch({type: 'SET_IS_DELETE_SUCCESS', body: false});

		methodAPI(file)
			.then(res =>{
				if(res === 'error') {
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: true})
					dispatch({type: 'SET_IS_UPLOADING_SUCCESS', body: false});
				}else{
					console.log(res)
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: false});
					dispatch({type: 'SET_IS_UPDATE_MY_IMAGES', body: !state.isUpdateMyPetsImage});
					if(typeEvent){
						dispatch({type: 'RESET_TEMPO_PATH_UPLOAD_PICTURE'});
						dispatch({type: 'SET_IMAGE_FOR_UPLOAD', body: ''});
						dispatch({type: 'SET_IS_UPLOADING_SUCCESS', body: true});
						setTimeout(() => dispatch({type: 'SET_IS_UPLOADING_SUCCESS', body: false}), 5000);
					}else{
						dispatch({type: 'SET_IS_DELETE_SUCCESS', body: true});
						setTimeout(() => dispatch({type: 'SET_IS_DELETE_SUCCESS', body: false}), 5000);
					}
				}
			})
	}

//update path image which user select by drag and drop interface
	const updateTempoPathImage = (path) => dispatch({type: 'SET_TEMPO_PATH_UPLOAD_PICTURE', body: path});

//save image which user select in store
	const saveUploadImage = (file) => dispatch({type: 'SET_IMAGE_FOR_UPLOAD', body: file});

//save name of image which will be upload in store
	const saveNameUploadImage = (name) => dispatch({type: 'SET_NAME_UPLOAD_IMAGE', body: name});

//set is uploading image has wrong extension
	const setIsImageWrong = (body) => dispatch({type: 'SET_IS_UPLOADING_IMAGE_WRONG', body});

//open and close modal window
	const handleModalWidow = (isOpen) => dispatch({type: 'SET_IS_UPLOAD_MODAL_OPEN', body: isOpen});

	return {
		changeLimit,
		state,
		setNextPage,
		setPreviousPage,
		handleUploadDeleteImages,
		handleModalWidow,
		updateTempoPathImage,
		saveUploadImage,
		saveNameUploadImage,
		getTime,
		setIsImageWrong
	}
}
export default useBusinessLayerMyDogs;