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
            message = responseData;
        } else if (typeof responseData === "object") {
            // Find the first property within 'responseData' that is an array or a string
            const errorProperty = Object.keys(responseData).find(
                (propiedad) =>
                    Array.isArray(responseData[propiedad]) ||
                    typeof responseData[propiedad] === "string"
            );

            // Extract the first element of the array or use the string as an error message
            message =
                errorProperty !== undefined
                    ? Array.isArray(responseData[errorProperty])
                        ? responseData[errorProperty][0]
                        : responseData[errorProperty]
                    : `Error: ${error.message}`;
        } else {
            message = `Error: ${error.message}`;
        }
    } else {
        message = error.message || "System error";
    }

    return message;
};
