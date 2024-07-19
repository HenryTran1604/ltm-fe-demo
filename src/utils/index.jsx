

export function isLoggedIn() {
    return !!localStorage.getItem('ltm');
}