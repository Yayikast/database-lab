let price = 123;
console.log(price.toUpperCase());

try {
  console.log(price.toUpperCase());
} catch (err) {
  console.log("Type error: ", err.message);
}
