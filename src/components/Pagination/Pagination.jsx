import styles from './Pagination.module.css';
import cn from 'classnames';
import { PAGINATION_QUANTITY } from '../../config/constants';


export const Pagination = ({ pagesToDisplay, totalPages, currentPage, setPage }) => {

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
		case 'ldots':
			setPage(pagesToDisplay[0] - 1);
			break;
		case 'rdots':
			setPage(pagesToDisplay[4] + 1);
			break;
		}
	};


	return (
		<div className={ styles.pagination }>

			{!!pagesToDisplay.length && (currentPage !== 1) &&
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
			<div data-name="ldots" onClick={handleNextClick} className={styles['pagination__page']}>.........</div>
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
			<div data-name="rdots" onClick={handleNextClick} className={styles['pagination__page']}>.........</div>
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
