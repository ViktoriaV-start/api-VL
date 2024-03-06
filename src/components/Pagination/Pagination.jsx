
import styles from './Pagination.module.css';
import cn from 'classnames';
import { PAGINATION_QUANTITY } from '../../config/constants';

export const Pagination = ({ pagesToDisplay, totalPages, currentPage, setPage }) => {
	console.log('Загрузка Pagination');

	const handleNextClick = (e) => {
		const action = e.target.getAttribute('data-name');
		switch (action) {
		case 'next':
			setPage(prev => prev + 1);
			break;
		case 'previous':
			setPage(prev => prev - 1);
			break;
		case 'page':
			setPage(+e.target.getAttribute('data-id'));
			break;
			
		}

	};




	return (
		<div className={ styles.pagination }>

			{!!pagesToDisplay.length && !(pagesToDisplay[0] == 1) &&
				<button
					type="button"
					className={ styles['pagination__lbtn'] }
					data-name="previous"
					onClick={handleNextClick}
				>
					&lt;
				</button>
			}

			{(pagesToDisplay[0] > 1) && 
			<div className={styles['pagination__dots']}>.........</div>
			}

			{pagesToDisplay.map(item => <button key={item} type="button"
				className={
					cn(
						styles['pagination__page'],
						{
							[styles['pagination__active']]: item == currentPage
						}
					)
				}
				data-id={item}
				data-name="page"
				onClick={handleNextClick}
			>
				{item}
			</button>
			)}

			{(pagesToDisplay[4] <= totalPages - PAGINATION_QUANTITY) && 
			<div className={styles['pagination__dots']}>.........</div>
			}

			{!!pagesToDisplay.length && (currentPage != totalPages) && 
			<button
				type="button"
				data-name="next"
				className={ styles['pagination__rbtn'] }
				onClick={handleNextClick}
			>
				&gt;
			</button>
			}
			
		</div>
	);
};