import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const Update = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/getsingle/${id}`)

                setUsername(response?.data?.username)
                setEmail(response?.data?.email)
                setPassword(response?.data?.password)

            } catch (error) {
                console.log(
                    error
                );
            }
        }
        getUser()
    }, [id])
    const handleFile = async (e) => {
        const file = e.target.files[0]
        setLoading(true)
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
            const data = new FormData()
            data.append("file", file);
            data.append("upload_preset", "sznx4umi")
            data.append("cloud_name", "ddvmanpjt")
            fetch('https://api.cloudinary.com/v1_1/ddvmanpjt/image/upload', {
                method: "POST",
                body: data
            }).then((res) => res.json())
                .then((data) => {
                    setImage(data.url.toString())
                    setLoading(false)
                })
        }

    }
    const handleUpdate = async (ev) => {
        ev.preventDefault()
        try {
            await axios.put(`http://localhost:8080/api/update/${id}`, {
                username, email, password, image
            })
            navigate("/show")

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="text-white w-[60%] mx-auto mt-16">
            <h2 className="text-center text-2xl font-normal">Edit User Below</h2>
            <form className="w-full shadow-xl flex flex-col items-center justify-center mt-4">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User Name" className=" md:w-[60%] p-3 border-none outline-none 
              focus-within:bg-blue-600 ... focus:ring-2 ring-pink-600 mb-6 bg-gray-700" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="User Email" className="md:w-[60%] p-3 border-none outline-none 
              focus-within:bg-blue-600 ... focus:ring-2 ring-pink-600 mb-6 bg-gray-700"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="User Password" className="md:w-[60%] p-3 border-none outline-none 
              focus-within:bg-blue-600 ... focus:ring-2 ring-pink-600 mb-6 bg-gray-700"/>
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input type="file" accept=".jpeg,.png,.jpg" onChange={(e) => handleFile(e)} className="block w-full text-sm text-slate-500
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    text-start mb-6"/>
                </label>
                <button type="Submit" onClick={handleUpdate} className="w-full md:w-[60%] p-3 border-none outline-none 
              bg-blue-600 mb-6 transition ease-in-out delay-200 hover:bg-transparent">
                    {
                        loading ? <p>Loading......</p> : <p> Update</p>
                    }

                </button>
            </form>
        </div>
    )
}
export default Update
