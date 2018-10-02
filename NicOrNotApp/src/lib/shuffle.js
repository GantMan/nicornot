  // Frustrating rewrite of simple array shuffle
  // oh JavaScript, when will you give us the basics
  export const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      // this semicolon is essential!?!?!?!?!
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
