var list = [
  'getElementById',
  'value',
  'substring',
  'picoCTF{',
  'not_this',
  'f49bf}',
  '_again_e',
  'this',
  'Password Verified',
  'Incorrect password'
];
function some(index) {
  return list[index];
}
function verify() {
  checkpass = document["getElementById"]('pass')["value"]
  if (checkpass["substring"](0, 8) == "picoCTF{") {
    if (checkpass["substring"](7, 9) == '{n') {
      if (checkpass["substring"](8, 16) == "not_this") {
        if (checkpass["substring"](3, 6) == 'oCT') {
          if (checkpass["substring"](24, 32) == "f49bf}") {
            if (checkpass["substring"](6, 11) == 'F{not') {
              if (checkpass["substring"](16, 24) == "_again_e") {
                if (checkpass["substring"](12, 16) == "this") {
                  alert("Password Verified")
                }
              }
            }
          }
        }
      }
    }
  } else {
    alert(some('9'))
  }
}
