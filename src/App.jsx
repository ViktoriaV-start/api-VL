import { md5 } from 'js-md5';


import './App.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EMPTY_FILTER, LIMIT, PAGINATION_QUANTITY, PASSWORD } from './config/constants';
import { useFetching } from './hooks/useFetching';
import { GetDataService } from './api/GetDataService';
import { Header } from './components/Header/Header';
import { ContentContext } from './context/ContentContext';
import { Table } from './components/Table/Table';

import { Pagination } from './components/Pagination/Pagination';
import { Filter } from './components/Filter/Filter';
import { Information } from './components/Information/Information';

function App() {
	const [totalPages, setTotalPages] = useState(0);
	const [productsIds, setProductsIds] = useState([]);
	const [currentProductsIds, setCurrentProductsIds] = useState([]);
	const [currentContent, setCurrentContent] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesToDisplay, setPagesToDisplay] = useState([]);
	const [emptyFilter, setEmptyFilter] = useState('');




	const xAuth = useMemo(() => {
		const timestamp = (new Date()).toISOString().slice(0, 10).replaceAll('-', '');
		return md5(PASSWORD + timestamp);
	}, []);

	const {
		fetching,
		isLoading,
		error,
	} = useFetching(async (body) => {
		const result = await GetDataService.getData(xAuth, body);
		if (result) {
			return result.result;
		}
	});

	useEffect(() => {
		if(error) loadPage();
	}, [error]);

	const filter = useCallback(({ field, value }) => {

		setEmptyFilter('');
		
		fetching({
			'action': 'filter',
			'params': { [field]: value, }
		})
			.then(data => {
				if (data && data.length) {
					const ids = Array.from(new Set(data));
					console.log(data);
					setCurrentContent([]);
					setCurrentPage(1);
					setTotalPages(getTotalPages(data.length));
					setCurrentProductsIds(ids);
				} else {
					setEmptyFilter(EMPTY_FILTER);
				}
			});
	}, []);

	const loadProductsIds = () => {
		fetching({'action': 'get_ids'})
			.then((data) => {
				if(data && data.length) {
					const ids = Array.from(new Set(data));
					setProductsIds(ids);
					setCurrentProductsIds(ids);
					console.log(data.length);
					setTotalPages(getTotalPages(data.length));
				}
			});
	};

	useEffect(() => {
		console.log('LOAD');
		loadPage();
	}, [currentProductsIds, currentPage]);

	const loadPage = () => {
		if (!productsIds.length) {
			console.log('Загрузка Ids');
			loadProductsIds();
		}

		if (currentProductsIds.length) {

			setCurrentContent([]);
			const startIdx = (currentPage - 1) * LIMIT;
			const endIdx = currentPage * LIMIT;
			console.log('Загрузка страницы: ', currentPage, currentProductsIds.length);
			fetching({'action': 'get_items',
				'params': {'ids': [...currentProductsIds.slice(startIdx, endIdx)] }})
				.then((data) => {
					if(data && data.length) {
						for (let elem of data) {
							setCurrentContent(prev => {
								if(prev.find(item => item.id == elem.id)) return [...prev];
								return [...prev, {...elem}];
							});
						}
					}

				});
		}
	};

	useEffect(() => {
		console.log('Текущая страница: ', currentPage);

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


	}, [currentPage, totalPages, currentProductsIds]);

	const getTotalPages = (value) => {
		return Math.ceil(value/LIMIT);
	};


	return (
		<>
			<Header />
			<Filter filter={filter} setEmptyFilter={setEmptyFilter} />

			<Information isLoading={isLoading} error={error} emptyFilter={emptyFilter} />

			<main className="main">
				<section className="admin__container">
					<ContentContext.Provider value={currentContent}>
						{!isLoading && !emptyFilter && currentContent.length && <Table />}
					</ContentContext.Provider>

				</section>

			</main>

			{!isLoading && !emptyFilter && currentContent.length && <Pagination pagesToDisplay={pagesToDisplay} totalPages={totalPages} currentPage={currentPage} setPage={setCurrentPage} />}

		</>
	);
}

export default App;
