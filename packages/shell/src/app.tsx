import React from 'react';
import MicroFrontend from './microfrontend';

const App : React.FC = () => {
	return <>
		<h1> Shell </h1>
		<MicroFrontend id="root-app1" url="http://localhost:3001" />
		<MicroFrontend id="root-app2" url="http://localhost:3002" />
	</>;
};

export default App;
