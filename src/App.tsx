import { createContext } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import MessageBoard from './MessageBoard'
import AllPosts from './AllPosts'
import PostView from './PostView'
import Welcome from './Welcome'
import NavBar from './NavBar'
import { UserInfo, useSession } from './use-session'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <MessageBoard />,
                children: [
                    {
                        path: ':pageNumber',
                        element: <AllPosts />,
                    },
                    {
                        path: 'post/:postId',
                        element: <PostView />,
                    },
                ],
            },
            {
                path: 'welcome',
                element: <Welcome />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App

export const UserContext = createContext<UserInfo>({
    session: null,
    profile: null,
})

function Layout() {
    const UserInfo = useSession()
    return (
        <>
            <UserContext.Provider value={UserInfo}>
                <NavBar />
                <Outlet />
            </UserContext.Provider>
        </>
    )
}
