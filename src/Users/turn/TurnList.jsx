import ItemsCrud from "../../components/ItemsCrud";

export function TurnList() {
  
    return (
        <>            
            <h1>List of turns component</h1>
            <ItemsCrud
                endpoint="turn/"
                displayField= "turn_number"
            />
        </>
    )
}