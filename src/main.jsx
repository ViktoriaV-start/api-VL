import React from 'react';
import ReactDOM from 'react-dom/client';
import './norm.css';
import './index.css';
import { App } from './App.jsx';
import { StoreContext } from './context/StoreContext.js';
import { FilterStore } from './Store/FilterStore.js';


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<StoreContext.Provider value = {{ filterStore: new FilterStore() }}>
			<App />
		</StoreContext.Provider>
	</React.StrictMode>,
);
