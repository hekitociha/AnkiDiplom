export const API_URL = "https://localhost:5001"

export const API = {
    Cards: {
        Get: `${API_URL}/api/cards`,
        Update: `${API_URL}/api/cards/update/`,
        Post: `${API_URL}/api/cards/add`,
        DeleteOne: `${API_URL}/api/cards/delete/`,
    },
    User: {
        Get: `${API_URL}/api/users`,
        Create: `${API_URL}/api/users/new`,
        Delete: `${API_URL}/api/users/delete/`,
        Change: `${API_URL}/api/users/update/`
    },
}