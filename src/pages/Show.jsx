import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const Show = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8080/api/getusers')
            setUsers(response.data)
        }
        fetchData()
    }, [])
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/user/${id}`)
            const newUsers = users.filter((item) => { return item._id !== id })
            setUsers(newUsers)

        } catch (error) {
            console.log("Error While Deleting a user", error);
        }
    }
    return (
        <div className="w-full h-screen">
            <h2 className="text-center text-white text-3xl">Users</h2>
            {
                users.map((user) => {
                    return (
                        <div key={user._id}>
                            <div className="p-4 md:p-8 flex flex-row items-center justify-around" key={user.email} >
                                <div className="bg-black shadow-xl w-[90%] md:w-[20%] flex items-center justify-center flex-col p-6" >
                                    <img src={user.image} alt='error' width={200} />
                                    <p className="text-purple-800 text-2xl font-medium mt-2">{user.username}</p>
                                    <p className="text-purple-800 text-2xl font-medium mt-2">{user.email}</p>
                                    <div className="text-white flex justify-between gap-4 md:hidden">
                                        <button className="bg-gray-700 text-white/100 text-xl p-3 w-[50%] mt-2">
                                            <Link to={`/show/${user._id}`}>
                                                Edit
                                            </Link>
                                        </button>
                                        <button className="bg-blue-800 text-white text-xl p-3 w-[50%] mt-2" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </div>
                                </div>
                                <div className="hidden md:text-white md:flex justify-between gap-4 mt-2">
                                    <button className="bg-gray-700 text-white/100 text-xl p-3 w-[50%] mt-2">
                                        <Link to={`/show/${user._id}`}>
                                            Edit
                                        </Link></button>
                                    <button className="bg-blue-800 text-white text-xl p-3 w-[50%] mt-2" onClick={() => handleDelete(user._id)}>Delete</button>
                                </div>
                            </div>
                            <hr className="w-[100%] md:w-[70%] mx-auto" />
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Show