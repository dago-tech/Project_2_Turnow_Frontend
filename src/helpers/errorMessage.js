export const errorMessage = (error) => {
    /* Manages different kind of error messages */

    let message = ""

    if (error.response) {
        message = error.response.data.detail || error.response.data.user?.[0] 
        || error.response.data.message || `Error: ${error.message}`;
    } else {
        message = error.message || "System error";
    }
    return message;
}