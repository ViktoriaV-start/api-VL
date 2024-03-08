import { forwardRef, useImperativeHandle, useState } from 'react';
import cn from 'classnames';
import styles from './Input.module.css';

export const Input = forwardRef(function Input({ isValid }, ref) {
	console.log('Загрузка Input');
	const [inputData, setInputData] = useState('');

	const handleChangeInput = (ev) => {
		setInputData(ev.target.value);
	};

	useImperativeHandle(ref, () => {
		return {
			clearInput() {
				setInputData('');
			},
		};
	}, []);

	return <input
		className={
			cn(
				styles.input,
				{
					[styles['invalid']]: !isValid
				}
			)
		}
		name="input"
		type="text"
		placeholder='Введите значение'
		ref={ref}
		value={inputData}
		onChange={handleChangeInput}/>;
});
