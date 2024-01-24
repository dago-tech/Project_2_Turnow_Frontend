import ItemsCrud from "../../ItemsCrud";

export function PriorityList() {
  /* Shows a list of created and stored priorities*/

  return (
    <div className="center">
      <h1>Priority List</h1>
      <ItemsCrud endpoint="priority/" displayField="name" />
    </div>
  );
}
