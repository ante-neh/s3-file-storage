const formatError = (error: unknown): string => {
    if(typeof error === 'string') return error;
    if(error instanceof Error) return error.message;
    return 'unknown error occurred';
} 

export { formatError };