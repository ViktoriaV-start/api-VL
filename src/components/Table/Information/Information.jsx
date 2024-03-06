import { TEXT_ERROR } from '../../../config/constants';
import styles from './Information.module.css';

export const Information = ({ isLoading, error }) => {


	return (
		<>
			{error && <div className={ styles['information'] }>{TEXT_ERROR}</div>}
			{isLoading && <div className={ styles['spinner'] }></div>}
		</>
	);
};