 function addrand(){
const randomNumber = Math.floor(Math.random() * 1000000000) + 1;
const newElement = document.createElement('h4');
newElement.textContent = `Случайное число: ${randomNumber}`;
document.body.appendChild(newElement);
 }
 debugger;
 addrand();