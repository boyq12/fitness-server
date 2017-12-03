export  = function (models, eventEmmiter) {
    models.User.afterCreate((user, options) => {
        console.log("user ::afterCreate ", user, options);
        eventEmmiter.emit("USER_CREATE", user);
    });
}