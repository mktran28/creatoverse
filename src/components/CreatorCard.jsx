export default function CreatorCard({
    name,
    url,
    description,
    imageURL
}) {
    return (
        <div>
            {imageURL && 
                <img src={imageURL} alt={`Photo of ${name}`}/>
            }

            <h2>{name}</h2>

            <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
            </a>

            <p>{description}</p>
        </div>
    )
}