import { ItemsList } from "../../components/ItemsList";

export function DesksList() {
    //const [count, setCount] = useState(0)
  
    return (
        <>            
            <h1>List of desks component</h1>
            <ItemsList
                endpoint="desk/"
            />
        </>
    )
}