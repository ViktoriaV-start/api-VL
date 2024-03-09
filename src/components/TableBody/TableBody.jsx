import { useContext } from 'react';
import styles from './TableBody.module.css';
import { ContentContext } from '../../context/ContentContext';


export const TableBody = () => {
	const content = useContext(ContentContext);

	const getPriceString = (num) => {
		return new Intl.NumberFormat('ru-RU').format(num);
	};

	return (
		<tbody className={ styles['table__body'] }>

			{content.map((elem) => {
				return (
					<tr key={elem.id} className={ styles['table__tr'] }>
						<td className={ styles['table__product'] + ' ' + styles['table__client'] } >{elem.product}</td>
						<td className={ styles['table__data'] }>{elem.brand}</td>
						<td className={ styles['table__data'] + ' ' + styles['table__sp'] }>{getPriceString(+elem.price)}</td>
					</tr>
				);
			})}

		</tbody>
	);
};
