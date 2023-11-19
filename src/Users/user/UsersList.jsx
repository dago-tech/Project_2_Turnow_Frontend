import React, { useEffect, useState } from 'react';
import Users from './users';
import ItemLoading from '../ItemLoading';

export function UsersList() {
    //const [count, setCount] = useState(0)
    
    const ItemLoadingComponent = ItemLoading(Users);
    const [appState, setAppState] = useState({
		loading: false,
		items: null,
    });

	useEffect(() => {
		setAppState({ loading: true });
		const apiUrl = `http://127.0.0.1:8000/api/user/`;
		fetch(apiUrl)
			.then((data) => data.json())
			.then((items) => {
				setAppState({ loading: false, items: items });
			});
	}, [setAppState]);

    return (
        <>
            <div className="App">
                <h1>List of users component</h1>
                <ItemLoadingComponent isLoading={appState.loading} items={appState.items} />
            </div>
        </>
    )
}