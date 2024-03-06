import { TableBody } from '../TableBody/TableBody';
import { TableFoot } from '../TableFoot/Tablefoot';
import { TableHead } from '../TableHead/TableHead';
import styles from './Table.module.css';

export const Table = ({ data }) => {


	return (
		<>
			<div className={ styles['table__wrap'] }>
				<table className={ styles['table'] }>
					<TableHead />
					<TableBody data={data}/>
					<TableFoot />
				</table>
			</div> 
		</>
	);
};