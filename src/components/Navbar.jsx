import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex flex-row justify-around items-center text-white shadow-md h-[70px] P-2">
            <div><h1 className="text-3xl">
                <Link to={'/'}>
                    CRUD
                </Link>
            </h1></div>
            <div>
                <ul className="flex flex-row justify-between items-center gap-4 ">
                    <li className="inline-flex flex-col text-xl gap-0">
                        <Link to='/create'> CREATE</Link>
                    </li>
                    <li className="text-xl">
                        <Link to={'/show'}> SHOW</Link>


                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar