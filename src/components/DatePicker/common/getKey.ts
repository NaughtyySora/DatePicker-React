const generateHash = () => {
  const lettersSmall = "qwertyuiopasdfghjklzxcvbnm";
  const numbers = "0123456789";
  const chars = "!@#$%^&*():_+';:|/?.,";
  const ds = [lettersSmall, numbers, chars];

  return (length = 8) => {
    let result = "";
    for (let i = 0, j = 0; j < length; i++, j++) {
      if (i > ds.length - 1) i = 0;
      const charsSet = ds[i];
      const random = Math.ceil(Math.random() * (charsSet.length - 1));
      result += charsSet[random];
    }
    return result;
  }
}

export const getKey = generateHash();