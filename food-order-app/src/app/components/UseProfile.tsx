import { useEffect, useState } from "react";

export default function UseProfile() {
    const [data, setData] = useState({} as any);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        fetch('/api/profile', {
            method: 'GET',
        }).then(async (res) => {
            setIsLoading(false);
            if (res.ok) {
                return res.json().then(data => {
                    setData(data);
                });
            } else {
                console.error('Failed to fetch user profile');
            }
        });
    }, []);

    return { isLoading, data };
}