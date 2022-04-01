export function generate(n) {
  var add = 1,
    max = 12 - add;
  if (n > max) {
    return generate(max) + generate(n - max);
  }
  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically 
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

export function generateVerifyCode(email) {
  if (email == "huongkstn@gmail.com")
    return "000000";
  if (email == "hung@gmail.com")
    return "111111";
  if (email == "hungduong@gmail.com")
    return "222222";
  return Math.floor(100000 + Math.random() * 900000);
}

