import ItemsCrud from '../../components/ItemsCrud';


export function UserList() {
    
    return (
        <div className="center">
            <h1>User List</h1>
            <ItemsCrud
                endpoint="user/"
                displayField= "user_name"
            />
        </div>
    )
}