let students = [];

function addStudent(id, name, age) {
  students.push({ id, name, age });
}

function findById(id) {
  return students.find((obj_stu) => obj_stu.id === id);
}

function listAll() {
  console.log(students);
}

function removeById(id) {
  students = students.filter((obj_stu) => obj_stu.id !== id);
}

// Add students
addStudent(1, "Yahyar", 20);
addStudent(2, "Pinya", 18);
addStudent(3, "Boeing", 20);
addStudent(4, "Marry", 21);
addStudent(5, "John", 19);
addStudent(6, "Tommy", 22);

// Print all (list)
console.log(students);

// Find student with id=2
console.log(findById(2));

listAll();
removeById(4);
listAll();
