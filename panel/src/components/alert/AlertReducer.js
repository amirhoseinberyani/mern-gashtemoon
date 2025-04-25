
function AlertReducer(state, action) {
    switch (action.type) {
        case "SUCCESS":
            return {
                open: true,
                message: action.payload.message,
                type: "success"
            }
        case "INFO":
            return {
                open: true,
                message: action.payload.message,
                type: "info"
            }
        case "ERROR":
            return {
                open: true,
                message: action.payload.message,
                type: "error"
            }
        case "WARNING":
            return {
                open: true,
                message: action.payload.message,
                type: "warning"
            }
        default:
            return {
                open: false,
                message: "",
                type: "success"
            }
    }
}
export default AlertReducer