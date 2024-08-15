
/** This is a utility class for error response handling for rest calls */

/**
 * A general response error 500
 * @param  res - response to attach the error
 * @param  err - the error
 */
export const responseError = (res, err) => {
    res.status(500).json({error: "Unable to process request", message: err})
}

/**
 * A not found response 404
 * @param  res - response to attach the error
 */
export const responseNotFound = (res, id) => {
    res.status(404).json({error: "Unable to find the item requested", message: `${id ? id : ""} Not Found`})
}

/**
 * A user side error 400
 * @param  res - response to attach the error
 * @param  err - the error
 */
export const responseUserError = (res, err) => {
    res.status(400).json({error: err, message: err})
}

/**
 * An auth issue
 * @param  res - response to attach the error
 */
export const responseUnauthorized = (res) => {
    res.status(401).json({error: "Unable to validate credentials", message: "Bad credentials or access to resource is forbidden"})
}

export const responseLogin = (req, res, next) => {
    !req.session.isLoggedIn ? res.redirect('/login') : next()
}