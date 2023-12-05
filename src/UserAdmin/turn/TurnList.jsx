import ItemsCrud from "../../components/ItemsCrud";

export function TurnList() {
    return (
        <div className="center">
            <h1>Turn List</h1>
            <ItemsCrud endpoint="turn/" displayField="turn_number" />
        </div>
    );
}
