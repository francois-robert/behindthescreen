export const prettyError = (err : Record<string, unknown>) => ({
    errors: Object.keys(err.errors).reduce((errors: Record<string, unknown>, key: string) => {
        errors[key] = err.errors[key].message;

        return errors;
    }, {})
})