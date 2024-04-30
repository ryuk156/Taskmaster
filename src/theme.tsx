import { extendBaseTheme, theme as chakraTheme } from "@chakra-ui/react";


export const theme = extendBaseTheme({
  components: {
    Button: {
      baseStyle: {
        background: "transparent",
        fontWeight: "bold",
        border: "2px solid black ",
        borderRadius: "10px",
        padding: "4px",
        _hover: {
          background: "black",
          color: "white",
        },
      },
      variants: {
        AddButton: {
          ...chakraTheme.components.Button.variants,
          padding: "15px",
          borderRadius: "25px",
        },
      },
    },
    Heading: {  
      baseStyle: {
        color: "black",
        fontWeight: "bold",
        fontSize: "2xl",
        padding: "10px",
        
      },
      variants: {
        h8: {
          
          fontSize: "36px",
          fontWeight: "bold",
        },
        label:{
          fontSize: "18px",
          fontWeight: "bold",
          color: "grey",
        }
      },
      

    }
  
  },
});
