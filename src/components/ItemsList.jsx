import React, { useEffect, useState } from 'react';
import Items from './Items';
import ItemLoading from './ItemLoading';

export function ItemsList(props) {
    //const [count, setCount] = useState(0)
    
    const ItemLoadingComponent = ItemLoading(props.component);
    const [appState, setAppState] = useState({
		loading: false,
		items: null,
    });

	useEffect(() => {
		setAppState({ loading: true });
		const apiUrl = `http://127.0.0.1:8000/api/${props.endpoint}`;
		fetch(apiUrl)
			.then((data) => data.json())
			.then((items) => {
				setAppState({ loading: false, items: items });
			});
	}, [setAppState]);

    return (
        <>
            <div className="App">
                <ItemLoadingComponent isLoading={appState.loading} items={appState.items} />
            </div>
        </>
    )
}