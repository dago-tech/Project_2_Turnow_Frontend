import ItemsCrud from "../../components/ItemsCrud";


export function DeskList() {
  
    return (
        <div className="center">            
            <h1>Service desk List</h1>
            <ItemsCrud
                endpoint="desk/"
                displayField= "name"
            />
        </div>
    )
}