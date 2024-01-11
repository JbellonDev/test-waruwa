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