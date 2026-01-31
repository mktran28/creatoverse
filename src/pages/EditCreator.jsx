import { useEffect, useState } from "react"
import { supabase } from "../client"
import { useNavigate, useParams, Link } from "react-router-dom"

export default function EditCreator() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchCreator() {
            const {data, error} = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setError(error.message);
            } else {
                setName(data.name);
                setUrl(data.url);
                setDescription(data.description);
                setImageURL(data.imageURL || "");
            }

            setLoading(false);
        }

        fetchCreator();
    }, [id])

    async function handleSubmit(e) {
        e.preventDefault();
        setError("")
        setSaving(true)

        const {error} = await supabase
            .from('creators')
            .update({name: name, description: description, url: url, imageURL: imageURL || null})
            .eq('id', id)

        if (error) {
            setError(error.message);
            setSaving(false)
            return;
        }
        
        setSaving(false)
        navigate("/")
    }

    if (loading) {
        return <div>Loading...</div>
    }

    async function handleDelete() {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this creator?"
        );

        if (!confirmDelete) {
            return;
        }

        setSaving(true);
        setError("")

        const {error} = await supabase
            .from('creators')
            .delete()
            .eq('id', id)

        if (error) {
            setError(error.message);
            setSaving(false);
            return;
        }

        navigate("/")
    }
    
    return (
        <div>
            <Link to = {`/creators/${id}`}>Back</Link>

            <h1>Edit Creator</h1>

            {error && <div>Error: {error}</div>}

            <form onSubmit = {handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>URL:</label>
                    <input 
                        value = {url}
                        onChange = {(e) => setUrl(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea 
                        value = {description}
                        onChange = {(e) => setDescription(e.target.value)}
                        rows = {3}
                        required
                    />
                </div>
                
                <div>
                    <label>Image URL:</label>
                    <input 
                        value = {imageURL}
                        onChange = {(e) => setImageURL(e.target.value)}
                    />
                </div>

                <button
                    type = "submit"
                    disabled = {saving}
                >
                    {saving ? "Saving..." : "Save changes"}
                </button>

                <button
                    type = "button"
                    onClick = {handleDelete}
                    disabled = {saving}
                >
                    Delete creator
                </button>
            </form>
        </div>
    )
}