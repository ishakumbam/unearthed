import React, {useState, useEffect} from 'react';
import './GiftDetails.css'
import { useParams } from 'react-router-dom'

const GiftDetails = ({data}) => {

    const { id } = useParams()

    const [gift, setGift] = useState({id: 0, name: "", pricePoint: "", audience: "", image: "", description: "", submittedBy: "", submittedOn: ""})

    useEffect(() => {
        const fetchGiftById = async () => {
            if (!id) return
            try {
                const response = await fetch(`/gifts/${id}`)
                if (!response.ok) return
                const result = await response.json()
                setGift(result)
            } catch (err) {
                // ignore errors
            }
        }

        fetchGiftById()

    }, [data, id]);


    return (
        <div className="GiftDetails">
            <main id="gift-content" className="gift-info">
                <div className="image-container">
                    <img id="image" src={gift.image} />
                </div>
                <div className="gift-details">
                    <h2 id="name">{gift.name}</h2>
                    <p id="submittedBy">{'Submitted By: ' + gift.submittedBy}</p>
                    <p id="pricepoint">{'Price: ' + gift.pricePoint}</p>
                    <p id="audience">{'Great For: ' + gift.audience}</p>
                    <p id="description">{gift.description}</p>
                </div>
            </main>
        </div>
    )
}

export default GiftDetails