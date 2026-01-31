import { supabase } from '../client.js'
import { useState, useEffect } from 'react';
import CreatorCard from '../components/CreatorCard.jsx'
import { Link } from 'react-router-dom';

export default function ShowCreators() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        async function fetchCreators() {
            const {data, error} = await supabase
                .from('creators')
                .select('*');

            if (error) {
                setError(error.message);
            } else {
                setCreators(data)
            }

            setLoading(false);
        }

        fetchCreators();
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <Link to = "/creators/new">Add a creator</Link>

            <h1>Creators</h1>

            {creators.length === 0 ? (
                <div>No creators yet</div>
            ) : (
                creators.map((creator) => (
                    <CreatorCard creator = {creator} key = {creator.id}/>
                ))
            )}
        </div>
    )
}