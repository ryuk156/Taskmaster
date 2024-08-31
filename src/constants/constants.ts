export const getRandomColor=()=>{

    const colors = [
        "rgb(0, 191, 255)",    // Deep Sky Blue
        "rgb(147, 112, 219)",  // Medium Purple
        "rgb(60, 179, 113)",   // Medium Sea Green
        "rgb(255, 99, 71)",    // Tomato
        "rgb(218, 165, 32)"    // Goldenrod
      ];
    
      // Generate a random index to choose a color from the array
      const randomIndex = Math.floor(Math.random() * colors.length);
    
      // Return the randomly chosen color
      return colors[randomIndex];

}