export const getIP = () => {
    return fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => {
            // console.log(data.IPv4)
            return data.ip
        }
        )
        .catch(err => {
            console.log(err)
            return null
        })
}

export const storeUserToLocalStorage = (key, user) => {
    localStorage.setItem(key, JSON.stringify(user));
}

export const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem('ltm');
    if (foundUser) {
        return JSON.parse(foundUser);
    }
    return null;
}

export const validateStudentCode = (uid) => {
    var regex = /^[Bb]\d{2}[a-zA-Z]{4}\d{3}$/g
    // console.log(uid)
    // console.log(regex.test(uid))
    return regex.test(uid)
}