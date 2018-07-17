var person = {};

person["firstName"] = 'Dinusha';
person["lastName"] = 'Bodhinayake';
person["age"] = 34;

delete person.age;

console.log(person);

function greetUser(person) {
  console.log("Hello " + person.firstName + " " + person.lastName);
}

greetUser(person);
