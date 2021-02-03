import './App.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

function App() {

	return (

		<div className="container">
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		</div>
	);
}

export default App;
