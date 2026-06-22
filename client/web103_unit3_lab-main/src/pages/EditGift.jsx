import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './EditGift.css'

const EditGift = () => {

    const { id } = useParams()
    const [gift, setGift] = useState({
        name: '',
        pricepoint: '',
        audience: '',
        image: '',
        description: '',
        submittedby: '',
        submittedon: ''
    })

    useEffect(() => {
        const fetchGiftById = async () => {
            const response = await fetch(`http://localhost:3001/gifts/${id}`)
            if (!response.ok) {
                console.error('API error fetching gift for edit:', response.status, await response.text())
                return
            }
            const data = await response.json()
            // API returns camelCase aliases — normalize to lowercase for the form
            setGift({
                name: data.name || '',
                pricepoint: data.pricePoint || data.pricepoint || '',
                audience: data.audience || '',
                image: data.image || '',
                description: data.description || '',
                submittedby: data.submittedBy || data.submittedby || '',
                submittedon: data.submittedOn || data.submittedon || ''
            })
        }

        fetchGiftById()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target
        setGift((prev) => ({ ...prev, [name]: value }))
    }

    const updateGift = (event) => {
        event.preventDefault()

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gift),
        }

        fetch(`/gifts/${id}`, options)

        window.location = '/'
    }

    const deleteGift = (event) => {
        event.preventDefault()

        const options = {
            method: 'DELETE'
        }

        fetch(`/gifts/${id}`, options)

        window.location = '/'
    }

    return (
        <div className='EditGift'>
            <center><h2>Edit Gift</h2></center>
            <form onSubmit={updateGift}>
                <label>Name</label><br />
                <input type='text' id='name' name='name' value={gift.name} onChange={handleChange} /><br />
                <br/>

                <label>Description</label><br />
                <textarea rows='5' cols='50' id='description' name='description' value={gift.description} onChange={handleChange}></textarea>
                <br/>

                <label>Image URL</label><br />
                <input type='text' id='image' name='image' value={gift.image} onChange={handleChange} /><br />
                <br/>

                <label>Price Point</label><br />
                <input type='text' id='pricepoint' name='pricepoint' value={gift.pricepoint} onChange={handleChange} /><br />
                <br/>

                <label>Audience</label><br />
                <input type="text" id='audience' name='audience' value={gift.audience} onChange={handleChange}/><br />
                <br/>

                <label>Submitted By</label><br />
                <input type='text' id='submittedby' name='submittedby' value={gift.submittedby} onChange={handleChange} /><br />
                <br/>

                <input className='submitButton' type='submit' value='Save Changes' />
                <button className='deleteButton' onClick={deleteGift}>Delete</button>
            </form>
        </div>
    )
}

export default EditGift
