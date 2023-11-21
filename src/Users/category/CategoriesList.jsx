import ItemsCrud from "../../components/ItemsCrud";

export function CategoriesList() {
    //const [count, setCount] = useState(0)
  
    return (
        <>            
            <h1>List of categories component</h1>
            {/* <ItemsList
                endpoint="category/"
                component = {Categories}
            /> */}
            <ItemsCrud
                endpoint="category/"
            />
        </>
    )
}