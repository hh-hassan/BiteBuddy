export const checkValidData = (email, password) => {
    
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    
    // /^(0|91)?[6-9][0-9]{9}$/
    
    if(!isEmailValid) return "Please enter a valid email address.";
    if(!isPasswordValid) return "Invalid password.";

    return null;
}