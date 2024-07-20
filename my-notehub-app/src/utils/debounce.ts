export function debounce(fn: (...args: any[]) => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const debouncedFunction = function (...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => fn(...args), delay);
    };

    debouncedFunction.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };

    return debouncedFunction;
}
