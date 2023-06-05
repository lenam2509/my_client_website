
import axiosInstance from '@/libs/axios'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'

export default function List() {
    const router = useRouter()
    const [users, setUsers] = React.useState([])
    const [reload, setReload] = React.useState(false)

    const handleLogOut = () => {
        localStorage.removeItem('token')
        setReload(!reload)
        router.push('/')
        toast.success('Đăng xuất thành công')
    }

    React.useEffect(() => {
        axiosInstance.get('/users').then(res => {
            setUsers(res.data)
        }
        ).catch(err => {
            console.log(err)
        }
        )
    }, [reload])
    return (
        <div>
            <h1 className="text-center text-2xl font-bold">Danh sách người dùng</h1>
            <button onClick={handleLogOut} className="btn btn-warning m-2">Đăng xuất</button>
            <div className="overflow-x-auto">
                <table className="table ">
                    {/* head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='bg-base-300 font-bold'>
                        {
                            users.map((user, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className={
                                        user.role === 'admin' ? 'text-error' : 'text-accent'
                                    }>{user.role}</td>
                                    <td>
                                        <button className="btn btn-sm  btn-accent">Edit</button>
                                        &nbsp;
                                        <button className="btn btn-sm btn-error">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
