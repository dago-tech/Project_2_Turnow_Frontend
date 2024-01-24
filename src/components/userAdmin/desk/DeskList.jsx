import ItemsCrud from "../../ItemsCrud";

export function DeskList() {
  /* Shows a list of created and stored desks (Service points)*/

  return (
    <div className="center">
      <h1>Service desk List</h1>
      <ItemsCrud endpoint="desk/" displayField="name" />
    </div>
  );
}
