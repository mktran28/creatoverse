import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'
import { useEffect, useState } from 'react';
import CreatorCard from '../components/CreatorCard';

export default function ViewCreator() {
    const {id} = useParams();

    const [creator, setCreator] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCreator() {
            const {data, error} = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single()
            
            if (error) {
                setError(error.message);
            } else {
                setCreator(data);
            }

            setLoading(false);
        }

        fetchCreator();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!creator) {
        return <div>Creator not found.</div>
    }

    return (
        <div>
            <Link to = "/">Back to all creators</Link>

            <Link to = {`/creators/${id}/edit`}>Edit</Link>

            <div>
                <CreatorCard creator = {creator} />
            </div>
        </div>
    );
}