import { Modal } from 'antd';
import TextInput from './TextInput';

interface User {
    id: string;
    fullName: string;
    age: string;
    salary: string;
    email: string;
    phone: string;
    image?: string;
}

interface EditUserModalProps {
    isOpen: boolean;
    userDetails: User;
    onClose: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: (user: any) => Promise<void>;
    confirmLoading?: boolean;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
    isOpen,
    userDetails,
    onClose,
    onChange,
    onSave,
    confirmLoading
}) => (
    <Modal title="Edit User" open={isOpen} okText="Edit" onOk={onSave} onCancel={onClose} confirmLoading={confirmLoading}>
        {userDetails ? (
            <div className='grid grid-cols-2 sm:gap-2'>
                <div className='sm:col-span-2 place-items-center p-5'>
                    <img src={userDetails?.image} alt="User" className="w-20 h-20 rounded-full" />
                </div>
                <div>
                    <TextInput
                        label='Full Name'
                        name="fullName"
                        value={userDetails.fullName}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <TextInput
                        label='Age'
                        name="age"
                        value={userDetails.age}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <TextInput
                        label='Email'
                        name="email"
                        value={userDetails.email}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <TextInput
                        label='Phone'
                        name="phone"
                        value={userDetails.phone}
                        onChange={onChange}
                    />
                </div>
            </div>
        ) : (
            <p>Loading user data...</p>
        )}
    </Modal>
);

export default EditUserModal;
