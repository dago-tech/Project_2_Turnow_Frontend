import ItemsCrud from "../../components/ItemsCrud";

export function CategoryList() {
    /* Shows a list of created and stored categories */
    
    return (
        <div className="center">
            <h1>Category List</h1>
            <ItemsCrud endpoint="category/" displayField="name" />
        </div>
    );
}
