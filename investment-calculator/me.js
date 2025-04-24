function WildcardCharacters(str) {
    const parts = str.split(" ");
    const pattern = parts[0];
    const text = parts[1];
    let patternIndex = 0;
    let textIndex = 0;
  
    while (patternIndex < pattern.length && textIndex < text.length) {
      const patternChar = pattern[patternIndex];
  
      if (patternChar === "+") {
        if (!/[a-zA-Z]/.test(text[textIndex])) {
          return false;
        }
        patternIndex++;
        textIndex++;
      } else if (patternChar === "*") {
        let repeatCount = 3;
        patternIndex++;
        if (patternIndex < pattern.length && pattern[patternIndex] === "{") {
          patternIndex++;
          let numStr = "";
          while (patternIndex < pattern.length && /\d/.test(pattern[patternIndex])) {
            numStr += pattern[patternIndex];
            patternIndex++;
          }
          if (patternIndex < pattern.length && pattern[patternIndex] === "}") {
            repeatCount = parseInt(numStr);
            patternIndex++;
          } else {
            // Invalid pattern format
            return false;
          }
        }
  
        if (textIndex + repeatCount > text.length) {
          return false;
        }
  
        const charToMatch = text[textIndex];
        for (let i = 0; i < repeatCount; i++) {
          if (text[textIndex + i] !== charToMatch) {
            return false;
          }
        }
        textIndex += repeatCount;
      } else {
        // Invalid pattern character
        return false;
      }
    }
  
    return patternIndex === pattern.length && textIndex === text.length;
  }
  
  // keep this function call here
  console.log(WildcardCharacters('**+*{2} mmmrrrkbb'));