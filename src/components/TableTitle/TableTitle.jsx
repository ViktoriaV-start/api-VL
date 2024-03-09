import { memo } from 'react';
import styles from './TableTitle.module.css';
import { TABLE_TITLE } from '../../config/constants';
import { Button } from '../Button/Button';


export const TableTitle = memo(function TableTitle({ isFiltration, returnToCatalog }) {
	const handleClick = () => {
		returnToCatalog();
	};

	return (
		<div className={ styles['table__title'] + ' container'}>
			{
				!isFiltration
					? TABLE_TITLE.catalog
					: <><div>{TABLE_TITLE.filter}</div>
						<Button className={'btn-return'} onClick={handleClick}>Перейти в каталог</Button>
					</>
			}
		</div>
	);
});
