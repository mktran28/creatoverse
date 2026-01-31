export default function CreatorCard({creator}) {
    const {name, url, description, imageURL} = creator;

    if (!creator) {
        return null;
    }

    return (
        <article>
            {imageURL && 
                <img src = {imageURL} alt = {`Photo of ${name}`}/>
            }

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