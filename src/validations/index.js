export const formValidations = (name, author, description) => {
  const alertMsg = "Character limit must be less than or equal to"
  const descriptionAllowedSpecialChars = /^[a-zA-Z0-9.-]+$/
  if (name.length > 50) {
    alert(`Invalid book name length. ${alertMsg} 50`)
    return false
  }

  if (author.length > 100) {
    alert(`Invalid author name length. ${alertMsg} 100`)
    return false
  }

  if (description.length > 100) {
    alert(`Invalid description length. ${alertMsg} 100`)
    return false
  }

  if (!descriptionAllowedSpecialChars.test(description)) {
    alert(`Invalid description special character(s). (-) and (.) are allowed.`)
    return false
  }

  return true
}

export const signUpValidations = (password) => {
  const signUpRegexValidation = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/

  if (password.length < 8) {
    alert("Invalid password! Password must be atleast 8 characters")
    return false
  }

  if (!signUpRegexValidation.test(password)) {
    alert(`Invalid password! Password must contain atleast one uppercase and special character`)
    return false
  }

  return true
}
