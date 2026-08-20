function getGrade(score) {
  if (score >= 80) {
    return "A";
  } else if (score >= 70) {
    return "B";
  } else if (score >= 60) {
    return "C";
  } else {
    return "F";
  }
}

console.log(getGrade(95));
console.log(getGrade(75));
console.log(getGrade(65));
console.log(getGrade(40));
