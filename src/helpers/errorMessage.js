export const errorMessage = (error) => {
  /* Manages different kind of error messages */

  let message = "";

  if (error.response) {
    // Search for data property in response
    const responseData = error.response.data;

    // Check if 'responseData' is an array and if it has at least one element
    if (Array.isArray(responseData) && responseData.length > 0) {
      // Extract the first element of the array as an error message
      message = responseData[0];
    } else if (typeof responseData === "string") {
      if (responseData.startsWith("<!DOCTYPE")) {
        //Si el error es un HTML
        message = error.message;
      } else {
        message = responseData;
      }
    } else if (typeof responseData === "object") {
      // Find the first property within 'responseData' that is an array or a string
      const errorProperty = Object.keys(responseData).find(
        (propiedad) =>
          Array.isArray(responseData[propiedad]) ||
          typeof responseData[propiedad] === "string"
      );

      // Extract the first element of the array or use the string as an error message
      if (errorProperty !== undefined) {
        if (Array.isArray(responseData[errorProperty])) {
          //If it is an array
          const errorKey = errorProperty;
          const errorKeyCapitalized =
            errorKey.charAt(0).toUpperCase() + errorKey.slice(1);

          message = `${errorKeyCapitalized}: ${responseData[errorProperty][0]}`;
        } else {
          message = responseData[errorProperty];
        }
      } else {
        message = `Error: ${error.message}`;
      }
    } else {
      message = error.message || "System error";
    } 
  } else {
    message = error.message || "System error";
  }

  return message;
};
