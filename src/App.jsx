import { md5 } from 'js-md5';


import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { LIMIT, PASSWORD } from './config/constants';
import { useFetching } from './hooks/useFetching';
import { GetDataService } from './api/GetDataService';
import { Header } from './components/Header/Header';
import { Table } from './components/Table/Table';
import { Information } from './components/Table/Information/Information';

function App() {
	const [totalPages, setTotalPages] = useState(0);
	const [productsId, setProductsId] = useState([]);
	const [currentContent, setCurrentContent] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	console.log(currentContent);


	const xAuth = useMemo(() => {
		const timestamp = (new Date()).toISOString().slice(0, 10).replaceAll('-', '');
		return md5(PASSWORD + timestamp);
	}, []);

	// async function getData1(url = 'http://api.valantis.store:40000/') {

	// 	try{
	// 		const response = await fetch(url, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'X-Auth': xAuth,
	// 			},

	// 			body: JSON.stringify({
	// 				// 'action': 'get_fields',
	// 				'action': 'get_ids',

	// 			}),
	// 		});

	// 		if(!response.ok) {
	// 			console.log('Ошибка при загрузке');
	// 		}

	// 		console.log(response);
	// 		return await response.json();

	// 	} catch (er) {
	// 		console.warn(er);
	// 	}
	// }

	//getData1().then((data) => console.log(data));

	const {
		fetching,
		isLoading,
		error,
	} = useFetching(async (body) => {
		const result = await GetDataService.getData(xAuth, body);

		if (result) {
			// switch(body.action) {
			// case 'get_ids':
			// 	console.log(result.result.length);
			// 	setProductsId(Array.from(new Set(result.result)));
			// 	setTotalPages(Math.ceil(result.result.length/LIMIT));
			// 	break;

			// case 'get_items':
			// 	for (let elem of result.result) {
			// 		setCurrentContent(prev => {
			// 			if(prev.find(item => item.id == elem.id)) return [...prev];
			// 			return [...prev, {...elem}];
			// 		});
					
			// 	}
			// 	return result.result;
			// 	//break;
			// }

			return result.result;
		}
		if(error) {
			console.log(error);
		}
	});

	useEffect(() => {
		console.log('Загрузка Ids');
		fetching({'action': 'get_ids'})
			.then((data) => {
				setProductsId(Array.from(new Set(data)));
				setTotalPages(Math.ceil(data.length/LIMIT));
			});
	}, []);

	useEffect(() => {

		if (productsId.length) {
			const startIdx = (currentPage - 1) * LIMIT;
			const endIdx = currentPage * LIMIT;
			console.log('Загрузка Первой страницы');
			fetching({'action': 'get_items',
				'params': {'ids': [...productsId.slice(startIdx, endIdx)] }})
				.then((data) => {
					for (let elem of data) {
						setCurrentContent(prev => {
							if(prev.find(item => item.id == elem.id)) return [...prev];
							return [...prev, {...elem}];
						});
					}
				});
		}

	}, [productsId]);
	


	return (
		<>
			<Header />
			
			<main className="main">
				<section className="admin__container">

					<Table data={currentContent}/>

				</section>

			</main>

			<Information isLoading={isLoading} error={error} />
				

			<p>{totalPages}</p>
			<p>{String(isLoading)}</p>




		</>
	);
}

export default App;
