import { memo } from 'react';
import styles from './Button.module.css';


export const Button = memo(function Button({ children, type='button', className = 'btn', onClick = (() => {}) }) {

	return (
		<button type={type} className={ styles[className] } onClick={onClick}>
			{children}
		</button>
	);
});
