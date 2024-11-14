import axios from 'axios';
import './App.css';
import { apiRoutes } from './config/apiRoutes';
import { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import EditUserModal from './components/EditUserModal';
import { Message } from './components/Message';
import { Spin } from 'antd';

function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const [userDetails, setUserDetails] = useState({
    id: "",
    fullName: "",
    age: "",
    salary: "",
    email: "",
    phone: "",
    image: ""
  });

  const handleChangeUserDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFetchUsers = async () => {
    setConfirmLoading(true)
    try {
      const res = await axios.get(apiRoutes.fetchUsers);
      setUsers(res?.data?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setConfirmLoading(false)
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const showModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setUserDetails({
      id: user?._id,
      fullName: user?.fullName,
      age: user?.age,
      salary: user?.salary,
      email: user?.email,
      phone: user?.phone,
      image: user?.image
    });
  };

  const handleOk = async () => {
    setConfirmLoading(true)

    await axios.put(`${apiRoutes.updateUser}/${selectedUser?._id}`, userDetails).then(res => {
      console.log("Updated Successfully.", res?.data);
    }).catch(err => {
      console.log("Some error occurred.", err);
    })

    setConfirmLoading(false);

    setIsModalOpen(false);
    setSelectedUser(null);
    Message("success", "Updated Successfully.")
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId: any) => {
    setUsers((prevUsers) => prevUsers.filter(user => user._id !== userDetails?.id));

    setConfirmLoading(true)
    await axios.delete(`${apiRoutes.deleteUser}/${userId}`).then(res => {
      console.log("Deleted.", res?.data)
      Message("success", "Deleted Successfully.")
    }).catch(err => {
      Message("error", "Some error occurred.")
      console.log(err)
    })
    setConfirmLoading(false)
  };

  return (
    <>
      <div className="text-red-900 text-3xl text-center mt-5 mb-2">Table goes here...</div>
      <hr />
      <Spin spinning={confirmLoading}>
        <UserTable data={users} onEditClick={showModal} onConfirmDelete={handleDeleteUser} onCancelDelete={() => null} confirmLoading={confirmLoading} />
      </Spin>
      <EditUserModal
        isOpen={isModalOpen}
        userDetails={userDetails}
        onClose={handleCancel}
        onChange={handleChangeUserDetails}
        onSave={handleOk}
        confirmLoading={confirmLoading}
      />
    </>
  );
}

export default App;
