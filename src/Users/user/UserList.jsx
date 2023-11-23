import ItemsCrud from '../../components/ItemsCrud';


export function UserList() {
    

    return (
        <>
            <h1>List of users</h1>
            <ItemsCrud
                endpoint="user/"
                displayField= "user_name"
            />
        </>
    )
}