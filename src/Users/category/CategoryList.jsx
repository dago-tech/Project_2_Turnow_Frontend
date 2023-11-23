import ItemsCrud from "../../components/ItemsCrud";


export function CategoryList() {
  
    return (
        <>            
            <h1>List of categories</h1>
            <ItemsCrud
                endpoint="category/"
                displayField= "name"
            />
        </>
    )
}