import crypto from 'crypto'
const algorithm = 'aes-256-ctr';

export function addDaysToDate(days: number, currentDate: Date) {
  let numberDays = days
  // Sumar días a la fecha actual
  const dueDate = new Date(currentDate);
  if(numberDays === 0) numberDays = 1

  dueDate.setDate(currentDate.getDate() + numberDays);

  return dueDate
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Añadir ceros a la izquierda si es necesario
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const desencryptHash = (text: string, secretWord: string, IV: string) => {
  const decipher = crypto.createDecipheriv(algorithm, secretWord, IV);
  let decrypted = decipher.update(text, 'base64', 'utf8');
  return (decrypted + decipher.final('utf8'));
};

export const encryptHash = (text: string, secretWord: string, IV: string) => {
  let cipher = crypto.createCipheriv(algorithm, secretWord, IV);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};
