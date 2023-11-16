'use client'
import React, { useState, useEffect } from 'react';

export function useFetch(url) {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    

    const fetchData = async () => {
        const response = await fetch(url, { mode: 'cors', method: 'GET' })
            .then(res => res.json())
            .then(json => {
                console.log('fetch....')
                console.log(json);
                setData(json);
            }).catch(error => {
                setError(error);
            }).finally(() => setIsLoading(false))
    }


    useEffect(() => {
        setIsLoading(true);
        console.log('useEffect.....');
        fetchData();
    }, [])


    return { data, isLoading, error};

}