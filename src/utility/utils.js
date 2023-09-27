
export const validateUsername = (username) => {
    if (username === "") {
        return `Username cannot be empty!`;
    }
    if (username.match(/[^A-z0-9_-]/g)) {
        return `Username must have no special symbols other than _ and - `;
    }
    if (username.length < 4) {
        return `Username must be four(4) characters or above!`;
    }

    return null;
}

export const validateEmail = (email) => {

    if (email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return `Email cannot be empty! No special symbols other than _ , . and @!`;
    }
    return null;
}



export const validatePassword = (password) => {
    if (password.match(/[^A-z0-9.]/g)) {
        return `Password must have no special symbols other than dot (.)!`;
    } else if (password === "") {
        return `Password cannot be empty!`;
    } else if (password.length < 6) {
        return `Password must be six(6) characters or above!`;
    }

    return null;
}