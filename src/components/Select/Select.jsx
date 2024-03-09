import { forwardRef, useImperativeHandle, useState } from 'react';
import cn from 'classnames';
import styles from './Select.module.css';


export const Select = forwardRef(function Select({ isValid }, ref) {
	const [selectValue, setSelectValue] = useState('default');

	const handleChangeSelect = (ev) => {
		setSelectValue(ev.target.value);
	};

	useImperativeHandle(ref, () => {
		return {
			clearSelect() {
				setSelectValue('default');
			},
		};
	}, []);

	return (
		<select value={selectValue}
			ref={ref}
			name="select"
			className={
				cn(
					styles.select,
					{
						[styles['invalid']]: !isValid
					}
				)
			}
			onChange={handleChangeSelect}
		>
			<option value="">Выберите поле</option>
			<option value="product">Название</option>
			<option value="brand">Бренд</option>
			<option value="price">Цена</option>
		</select>
	);
});
