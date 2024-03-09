import { useState } from 'react';

/**
 * Простой callback
 * @param {Function} fn
 */
export const useFetching = (fn) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const fetching = async (...args) => {
		try {
			setIsLoading(true);
			setError('');
			return await fn(...args);
		} catch (error) {
			console.error('ОШИБКА ПРИ ЗАГРУЗКЕ : ', error.message);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, error, fetching };
};
