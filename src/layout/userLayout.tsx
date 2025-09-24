import { Link, Outlet } from "@tanstack/react-router"

const activeProps = { style: { fontWeight: 'bold' } }

export default function userLayout() {
    return (
        <div className="">
            <div className="bg-red-500 p-4 mb-4">
                <ul>

                    <li><Link to="/dashboard" activeProps={activeProps}>Dashboard</Link></li>

                    <li><Link to="/feeds" activeProps={activeProps}>Feeds</Link></li>

                    <li><Link to="/notifications" activeProps={activeProps}>Notification</Link></li>

                    <li><Link to="/" activeProps={activeProps}>Sign Out</Link></li>
                </ul>
            </div>
        <Outlet />
        </div>
    )
}