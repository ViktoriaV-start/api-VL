import { memo } from 'react';
import styles from './TableFoot.module.css';

export const TableFoot = memo(function TableFoot() {

	return (
		<tfoot>
			<tr className={ styles['table__footer'] }></tr>
		</tfoot>
	);
});
