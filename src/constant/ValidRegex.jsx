const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 
const phoneRegex = /^(\+994|0)(50|51|55|70|77|99)([0-9]{7})$/; 
 
export const isValidEmail = (email) => emailRegex.test(email); 
export const isValidPhone = (phone) => phoneRegex.test(phone);