import React, { useEffect, useState } from 'react';

interface Data {
    message: string;
    status: string;
}

export default function Cookies() {
    const [data, setData] = useState<Data | null>(null);
 

    useEffect(() => {
        // Fetch other data from the API
        fetch('http://127.0.0.1:8000/send_data/')
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div>
          
         
        </div>
    );
}

 