import { EMPTY_FILTER, TEXT_ERROR } from '../../config/constants';
import styles from './Information.module.css';

export const Information = ({ isLoading, error, emptyFilter }) => {

	return (
		<div className={ styles.info }>
			{error && <div className={ styles.text }>{TEXT_ERROR}</div>}
			{!isLoading && emptyFilter && <div className={ styles.text }>{EMPTY_FILTER}</div>}
			{isLoading && <div className={ styles['spinner'] }></div>}
		</div>
	);
};
