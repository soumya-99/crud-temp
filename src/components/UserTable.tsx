import { Popconfirm } from "antd";

interface UserTableProps {
    data: any[];
    onEditClick: (user: any) => void;
    // onDeleteClick: (userId: any) => void;
    onConfirmDelete: (userId: any) => void;
    onCancelDelete: () => null
    confirmLoading?: boolean
}

function UserTable({ data, onEditClick, onConfirmDelete, onCancelDelete, confirmLoading }: UserTableProps) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-52 mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Profile</th>
                        <th scope="col" className="px-6 py-3">Full Name</th>
                        <th scope="col" className="px-6 py-3">Age</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Phone</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i} className="bg-white border-b">
                            <td className="px-6 py-4">
                                <img src={item.image} alt="User" className="w-10 h-10 rounded-full" />
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {item.fullName}
                            </th>
                            <td className="px-6 py-4">{item.age}</td>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4">{item.phone}</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onEditClick(item);
                                    }}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Edit
                                </a>
                                {' / '}

                                <Popconfirm
                                    title="Delete the user"
                                    description="Are you sure to delete this user?"
                                    onConfirm={() => onConfirmDelete(item?._id)}
                                    onCancel={onCancelDelete}
                                    okText="Yes"
                                    cancelText="No"
                                    okButtonProps={{ loading: confirmLoading }}
                                >
                                    <a onClick={(e) => {
                                        e.preventDefault();
                                    }} className="font-medium text-red-600 hover:underline">Delete</a>
                                </Popconfirm>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
