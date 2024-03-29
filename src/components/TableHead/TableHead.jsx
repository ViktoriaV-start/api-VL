import { memo } from 'react';
import styles from './TableHead.module.css';


export const TableHead = memo(function TableHead() {

	return (
		<thead>
			<tr className={ styles['table__header'] }>
				<td className={ styles['table__text'] } data-name="name">
					<span className={ styles['table__btn'] } data-name="name">ID</span>
				</td>
				<td className={ styles['table__text'] } data-name="name">
					<span className={ styles['table__btn'] } data-name="name">Название</span>
				</td>
				<td className={ styles['table__text'] } data-name="brand">
					<span className={ styles['table__btn'] } data-name="brand">Бренд</span>
				</td>
				<td className={ styles['table__text'] } data-name="price">
					<span className={ styles['table__btn'] } data-name="price">Цена, руб</span>
				</td>

			</tr>
		</thead>
	);
});
