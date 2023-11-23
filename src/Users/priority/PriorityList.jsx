import ItemsCrud from "../../components/ItemsCrud";


export function PriorityList() {
  
    return (
        <>            
            <h1>List of priorities</h1>
            <ItemsCrud
                endpoint="priority/"
                displayField= "name"
            />
        </>
    )
}