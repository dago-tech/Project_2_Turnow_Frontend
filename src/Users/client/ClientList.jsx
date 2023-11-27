import ItemsCrud from "../../components/ItemsCrud";


export function ClientList() {
  
    return (
        <>            
            <h1>List of clients</h1>
            <ItemsCrud
                endpoint="client/"
                displayField= "personal_id"
            />
        </>
    )
}