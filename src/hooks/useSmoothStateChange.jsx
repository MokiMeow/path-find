import { useState, useEffect, useRef } from "react";

function useSmoothStateChange(initialState, fromValue, toValue, duration, trigger, reverse) {
    const [state, setState] = useState(initialState);
    const animationFrameRef = useRef();

    useEffect(() => {
        if (!trigger) return undefined;

        const startTime = performance.now();
        function updateState(currentTime) {
            const elapsedTime = currentTime - startTime;

            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                const newValue = reverse
                    ? toValue + progress * (fromValue - toValue)
                    : fromValue + progress * (toValue - fromValue);

                setState(newValue);

                animationFrameRef.current = requestAnimationFrame(updateState);
            } 
            else {
                setState(reverse ? fromValue : toValue);
            }
        }

        animationFrameRef.current = requestAnimationFrame(updateState);

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [fromValue, toValue, duration, trigger, reverse]);

    return state;
}

export default useSmoothStateChange;
