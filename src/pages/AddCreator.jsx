import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../client"

export default function AddCreator() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("")
        setLoading(true)

        const {error} = await supabase
            .from('creators')
            .insert({name: name, description: description, url: url, imageURL: imageURL || null})

        if (error) {
            setError(error.message);
            setLoading(false)
            return;
        }
        
        setLoading(false)
        navigate("/")
    }
    
    return (
        <div>
            <Link to = "/">Back to all creators</Link>

            <h1>Add a Creator</h1>

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
                    disabled = {loading}
                >
                    {loading ? "Loading..." : "Save creator"}
                </button>
            </form>
        </div>
    )
}