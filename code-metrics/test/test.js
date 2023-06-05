// Task 1: Find the maximum of two numbers
function findMax(a, b) {
  return Math.max(a, b);
}

console.log(findMax(5, 10)); 

function calculateSum(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(calculateSum([1, 2, 3, 4, 5])); 


function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(generateRandomNumber(1, 100)); 

/* Task 4: Check 
if a number 
is prime */

function isPrime(number) {
  if (number <= 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(17)); 
console.log(isPrime(25)); 
