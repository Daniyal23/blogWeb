module.exports = app => {
    app.use("/api/v1/Blogs", require("./api/v1/Blogs"));
    app.use("/api/v1/Comments", require("./api/v1/Comments"));
    app.use("/api/v1/Users", require("./api/v1/Users"));
};