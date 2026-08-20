let students = [];

function addStudent(student) {
  students.push(student);
}

function listAll() {
  for (let student of students) {
    console.log(student);
  }
}

function removeById(id) {
  students = students.filter((student) => student.id !== id);
}

addStudent({ id: 1, name: "Anong", year: 2 });
addStudent({ id: 2, name: "Somchai", year: 3 });
addStudent({ id: 3, name: "Malee", year: 1 });

removeById(2);

listAll();

// Limitation
// Data stored in an array is lost when the program stops
// Unlike a real database you can't permanently store data
