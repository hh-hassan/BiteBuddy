import { useState, useEffect } from "react";

const useOnlineStatus = () => {
    
    const [status, setstatus] = useState(navigator.onLine);

    useEffect(() => {

        window.addEventListener('online', () => {setstatus(true)});
        window.addEventListener('offline', () => {setstatus(false)});

    }, []);

    return status;
}

export default useOnlineStatus;