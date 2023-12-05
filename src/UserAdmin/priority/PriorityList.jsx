import ItemsCrud from "../../components/ItemsCrud";

export function PriorityList() {
    return (
        <div className="center">
            <h1>Priority List</h1>
            <ItemsCrud endpoint="priority/" displayField="name" />
        </div>
    );
}
