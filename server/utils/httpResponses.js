module.exports = {

    SUCCESS : ( message, data = {} ) => {
        return {
            meta : {
                status : 200,
                response : "OK",
                message
            },
            data
        }
    },
    CREATED : ( message, data = {} ) => {
        return {
            meta : {
                status : 201,
                response : "Created",
                message
            },
            data
        }
    },
    ACCEPTED : ( message, data = {} ) => {
        return {
            meta : {
                status : 202,
                response : "Accepted",
                message
            },
            data
        }
    },
    NON_AUTHORATIVE : ( message, data = {} ) => {
        return {
            meta : {
                status : 203,
                response : "Non-Authoritative Information",
                message
            },
            data
        }
    },
    NO_CONTENT : ( message, data = {} ) => {
        return {
            meta : {
                status : 204,
                response : "No Content",
                message
            },
            data
        }
    },
    NOT_MODIFIED : ( message, data = {} ) => {
        return {
            meta : {
                status : 304,
                response : "Not Modified.",
                message
            },
            data
        }
    },
    BAD_REQUEST : ( message, data = {} ) => {
        return {
            meta : {
                status : 400,
                response : "Bad Request",
                message
            },
            data
        }
    },
    UNAUTHORIZED : ( message, data = {} ) => {
        return {
            meta : {
                status : 401,
                response : "Unauthorized",
                message
            },
            data
        }
    },
    PAYMENT_REQUIRED : ( message, data = {} ) => {
        return {
            meta : {
                status : 402,
                response : "Payment Required",
                message
            },
            data
        }
    },
    FORBIDDEN : ( message, data = {} ) => {
        return {
            meta : {
                status : 403,
                response : "Forbidden",
                message
            },
            data
        }
    },
    NOT_FOUND : ( message, data = {} ) => {
        return {
            meta : {
                status : 404,
                response : "Not Found",
                message
            },
            data
        }
    },
    CONFLICT : ( message, data = {} ) => {
        return {
            meta : {
                status : 409,
                response : "Conflict",
                message
            },
            data
        }
    },
    NOT_ALLOWED : ( message, data = {} ) => {
        return {
            meta : {
                status : 405,
                response : "Method not allowed.",
                message
            },
            data
        }
    },
    INTERNAL_SERVER : ( message, data = {} ) => {
        return {
            meta : {
                status : 409,
                response : "Internal Server Error",
                message
            },
            data
        }
    }

}