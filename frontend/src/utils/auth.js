// export const BASE_URL = 'https://register.nomoreparties.co';
export const BASE_URL = 'https://www.aroundtheglobe.students.nomoreparties.site/'
const checkResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
};

// creates a new user
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
        .then(checkResponse)
};

export const authorization = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email }),
    })
        .then(checkResponse)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            } else {
                return;
            }
        })
}

// get info from profile, such as username
export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(checkResponse)
        .then(data => data)
}