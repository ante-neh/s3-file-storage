class BadRequestError extends Error {
    constructor(message:string){
        super(message);
    }
}

class UserNotAuthenticatedError extends Error {
    constructor(message:string){
        super(message);
    }
}

class UserForbiddenError extends Error{
    constructor(message: string){
        super(message);
    }
}

class NotFoundError extends Error{
    constructor(message: string){
        super(message);
    }
}


export { BadRequestError, UserNotAuthenticatedError, UserForbiddenError, NotFoundError };