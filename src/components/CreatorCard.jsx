import { Link } from "react-router-dom";

export default function CreatorCard({creator}) {
    const {id, name, url, description, imageURL} = creator;

    if (!creator) {
        return null;
    }

    return (
        <article className = "w-full max-w-xl mx-auto">
            {imageURL && 
                <img src = {imageURL} alt = {`Photo of ${name}`}/>
            }

            <Link to = {`/creators/${id}/edit`}>Edit</Link>

            <div>
                <h2>{name}</h2>

                {url && (
                    <a href = {url} target = "_blank" rel = "noreferrer">Visit channel</a>
                )}

                <p>{description}</p>
            </div>
        </article>
    )
}