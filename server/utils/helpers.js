const HTTPRESPONSE = require('../utils/httpResponses');

module.exports = {
    SEND_RESPONSE : (res, httpResponse= HTTPRESPONSE.INTERNAL_SERVER("")) => {
        res.status(httpResponse.meta.status).json(httpResponse);
    },
}