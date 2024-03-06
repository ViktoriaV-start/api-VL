import { md5 } from 'js-md5';


import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { LIMIT, PAGINATION_QUANTITY, PASSWORD } from './config/constants';
import { useFetching } from './hooks/useFetching';
import { GetDataService } from './api/GetDataService';
import { Header } from './components/Header/Header';
import { ContentContext } from './context/ContentContext';
import { Table } from './components/Table/Table';
import { Information } from './components/Table/Information/Information';
import { Pagination } from './components/Pagination/Pagination';

function App() {
	const [productsQuantity, setProductsQuantity] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [productsId, setProductsId] = useState([]);
	const [currentContent, setCurrentContent] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesToDisplay, setPagesToDisplay] = useState([]);




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
				setProductsQuantity(data.length);
				setTotalPages(Math.ceil(data.length/LIMIT));
			});
	}, []);

	useEffect(() => {

		if (productsId.length) {

			setCurrentContent([]);
			const startIdx = (currentPage - 1) * LIMIT;
			const endIdx = currentPage * LIMIT;
			console.log('Загрузка страницы: ', currentPage);
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

	}, [productsId, currentPage]);



	useEffect(() => {


		if (totalPages == 1) setPagesToDisplay([]);

		if(totalPages != 1 && currentPage == 1 && totalPages <= PAGINATION_QUANTITY) {
			setPagesToDisplay([]);
			setPagesToDisplay([]);
			for(let i = currentPage-1; i < totalPages; i++) {
				setPagesToDisplay(prev => [...prev, i+1]);
			}
		}

		if(currentPage == 1 && totalPages > PAGINATION_QUANTITY) {
			setPagesToDisplay([]);
			for(let i = currentPage-1; i < PAGINATION_QUANTITY; i++) {
				setPagesToDisplay(prev => [...prev, i+1]);
			}
		}

		if(currentPage != 1 && !((currentPage-1) % 5) && (currentPage - 1 + PAGINATION_QUANTITY) < totalPages) {
			setPagesToDisplay([]);

			for(let i = currentPage-1; i < (PAGINATION_QUANTITY + currentPage - 1); i++) {
				setPagesToDisplay(prev => [...prev, i+1]);
			}
		}

		if(currentPage != 1 && !((currentPage-1) % 5) && (currentPage - 1 + PAGINATION_QUANTITY) >= totalPages) {
			setPagesToDisplay([]);

			for(let i = currentPage-1; i < totalPages; i++) {
				setPagesToDisplay(prev => [...prev, i+1]);
			}
		}

		if (!(currentPage % 5) && currentPage < pagesToDisplay[0]) {
			setPagesToDisplay([]);
			for(let i = currentPage - PAGINATION_QUANTITY; i < currentPage; i++) {
				setPagesToDisplay(prev => [...prev, i+1]);
			}
		}


	}, [currentPage, totalPages]);


	return (
		<>
			<Header />
			
			<main className="main">
				<section className="admin__container">
					<ContentContext.Provider value={currentContent}>
						<Table />
					</ContentContext.Provider>

				</section>

			</main>

			<Information isLoading={isLoading} error={error} />

			{!isLoading && <Pagination pagesToDisplay={pagesToDisplay} totalPages={totalPages} currentPage={currentPage} setPage={setCurrentPage} />}
				

			<p>{totalPages}</p>





		</>
	);
}

export default App;
