import ItemsCrud from "../../components/ItemsCrud";


export function DeskList() {
    //const [count, setCount] = useState(0)
  
    return (
        <>            
            <h1>List of desks component</h1>
            <ItemsCrud
                endpoint="desk/"
                displayField= "name"
            />
        </>
    )
}