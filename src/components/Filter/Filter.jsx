import { memo, useEffect, useRef, useState } from 'react';
import styles from './Filter.module.css';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';


export const Filter = memo(function Filter({ filter, setEmptyFilter, emptyFilter, returnToCatalog }) {

	const [isValidForm, setIsValidForm] = useState({ select: true, input: true });

	const inputRef = useRef(null);
	const selectRef = useRef(null);

	const handleSubmit = (ev) => {
		ev.preventDefault();
		const formData = new FormData(ev.target);
		const formProps = Object.fromEntries(formData);
		let isValid = true;

		for (let key in formProps) {
			formProps[key] = formProps[key].trim();
			if(!formProps[key]) {
				setIsValidForm(prev => ({...prev, [key]: false}));
				isValid = false;
			}
		}

		if(formProps.select === 'price') {
			formProps.input = parseFloat((+formProps.input).toFixed(1));
			if (isNaN(formProps.input)) {
				setIsValidForm(prev => ({...prev, 'input': false}));
				isValid = false;
			}
		}

		if(isValid) filter({ field: formProps.select, value: formProps.input });
	};

	useEffect(() => {
		let timeoutId;
		for (let key in isValidForm) {
			if(!isValidForm[key]) {
				timeoutId = setTimeout(() => {
					setIsValidForm(prev => ({...prev, [key]: true}));
				}, 2000);
			}
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [isValidForm]);

	const clear = () => {
		if(emptyFilter) {
			returnToCatalog();
		}

		setEmptyFilter('');

		if(inputRef.current) {
			inputRef.current.clearInput();
		}

		if(selectRef.current) {
			selectRef.current.clearSelect();
		}
	};

	return (
		<form className={ styles.filter + ' container' } onSubmit={handleSubmit}>
			<div className={ styles['filter__title']}>Поиск</div>

			<Select ref={selectRef} isValid={isValidForm.select} />

			<Input ref={inputRef} isValid={isValidForm.input} />
			<Button type="submit" >Поиск</Button>
			<Button type="button" className="clear" onClick={clear}>Очистить</Button>
		</form>
	);
});
