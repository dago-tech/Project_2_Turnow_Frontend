import ItemsCrud from "../../components/ItemsCrud";

export function ClientList() {
    /* Shows a list of created and stored clients */

    return (
        <div className="center">
            <h1>Client List</h1>
            <ItemsCrud endpoint="client/" displayField="personal_id" />
        </div>
    );
}
