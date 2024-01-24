import ItemsCrud from "../../ItemsCrud";

export function TurnList() {
  /* Shows a list of created and stored turns*/

  return (
    <div className="center">
      <h1>Turn List</h1>
      <ItemsCrud endpoint="turn/" displayField="turn_number" />
    </div>
  );
}
