import jwt from 'jsonwebtoken'

export const Onlyadmin = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        console.log(token);
        
        if (!token) {
            const error = new Error('Unauthorized - No token provided')
            error.status = 403
            return next(error)
        }
        
        try {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
            
            if (!decodeToken.role) {
                const error = new Error('Unauthorized - Invalid token format')
                error.status = 403
                return next(error)
            }
            
            if (decodeToken.role === 'admin') {
                req.user = decodeToken
                next()
            } else {
                const error = new Error('Unauthorized - Admin access required')
                error.status = 403
                return next(error)
            }
        } catch (jwtError) {
            const error = new Error('Unauthorized - Invalid token')
            error.status = 403
            return next(error)
        }
    } catch (error) {
        error.status = 500
        next(error)
    }
}