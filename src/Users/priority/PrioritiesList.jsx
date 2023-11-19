import { ItemsList } from "../../components/ItemsList";

export function PrioritiesList() {
    //const [count, setCount] = useState(0)
  
    return (
        <>            
            <h1>List of priorities component</h1>
            <ItemsList
                endpoint="priority/"
            />
        </>
    )
}