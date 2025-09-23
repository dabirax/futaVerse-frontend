import { Link, Outlet } from "@tanstack/react-router"

const activeProps = { style: { fontWeight: 'bold' } }

export function Root() {
    return (
        <div className="">
            <div className="bg-red-500 p-4 mb-4">
                <ul>
                    <li><Link to="/" activeProps={activeProps}>Landing</Link></li>

                    <li><Link to="/dashboard" activeProps={activeProps}>Dashboard</Link></li>

                    <li><Link to="/login" activeProps={activeProps}>Login</Link></li>
                </ul>
            </div>
        <Outlet />
        </div>
    )
}