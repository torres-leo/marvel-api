import { useEffect } from 'react';

export const useDebounce = (effect, delay, deps) => {
	useEffect(() => {
		const handler = setTimeout(() => effect(), delay);

		return () => clearTimeout(handler);
	}, [...(deps || []), delay]);
};
