import { Link } from 'react-router-dom';

const Categories = (props) => {
	const { items } = props;
	//const classes = useStyles();
	if (!items || items.length === 0) return <p>Can not find any items, sorry</p>;

	return (
        <>
            <div>            
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name} - 
                            <Link to={`/edit/${item.id}`}> Editarrrr </Link> - 
                            {/* <button onClick={() => onDeleteClick(item.id)}>Eliminar</button> */}
                        </li>
                    ))}
                {/* {items.map(item => (
                    <li key={item.id}>{item.name}     Edit   Delete</li>
                ))} */}
                </ul>
                
            </div>
        </>
	
	);
};
export default Categories;