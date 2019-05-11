import axios from 'axios';

export async function postRequest(url,data){
	
	const instance = axios.create({
	  headers: {'Content-Type': 'application/json' }
	});

	try{
		const response = await instance.post(url,data);
		const response_data = await response.data;
	    return(response_data);
	}
	catch(error)
	{
		return error.message
	}
}

export async function getRequest(url){
	const instance = axios.create({
	  headers: {'Content-Type': 'application/json' }
	});

	try{
		const response = await instance.get(url);
		const response_data = await response.data;
	    return(response_data);
	}
	catch(error)
	{
		return error.message
	}	
}

export async function deleteRequest(url){
	const instance = axios.create({
	  headers: {'Content-Type': 'application/json' }
	});

	try{
		const response = await instance.delete(url);
		const response_data = await response.data;
	    return(response_data);
	}
	catch(error)
	{
		return error.message
	}	
}

export async function putRequest(url,data){
	const instance = axios.create({
	  headers: {'Content-Type': 'application/json' }
	});

	try{
		const response = await instance.put(url,data);
		const response_data = await response.data;
	    return(response_data);
	}
	catch(error)
	{
		return error.message
	}	
}