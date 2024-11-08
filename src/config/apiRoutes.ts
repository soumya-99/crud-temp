import { BASE_URL } from "./config";

export const apiRoutes = {
    fetchUsers: `${BASE_URL}/employee/list`,
    updateUser: `${BASE_URL}/employee-update`,
    deleteUser: `${BASE_URL}/employee-remove`
}