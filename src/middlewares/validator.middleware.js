export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        // La propiedad correcta es .issues
        return res.status(400).json(error.issues.map((issue) => issue.message));
    }
}