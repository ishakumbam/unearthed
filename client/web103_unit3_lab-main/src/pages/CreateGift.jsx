import { useState } from 'react'
import './CreateGift.css'

const CreateGift = () => {

    const date = new Date()
    const currentDate = date.toISOString()

    const [gift, setGift] = useState({
        id: 0,
        name: '',
        pricepoint: '',
        audience: '',
        image: '',
        description: '',
        submittedby: '',
        submittedon: currentDate
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setGift((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const createGift = async (event) => {
        event.preventDefault()

        const newGift = {
            ...gift,
            submittedon: new Date().toISOString()
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGift)
        }

        const response = await fetch('http://localhost:3001/gifts', options)

        if (!response.ok) {
            const err = await response.text()
            console.error('Failed to create gift:', err)
            return
        }

        window.location = '/'
    }

    return (
        <div className='CreateGift'>
            <center><h2>Add a Gift</h2></center>

            <form onSubmit={createGift}>
                <label>Name</label><br />
                <input
                    type='text'
                    name='name'
                    value={gift.name}
                    onChange={handleChange}
                /><br /><br />

                <label>Description</label><br />
                <textarea
                    rows='5'
                    cols='50'
                    name='description'
                    value={gift.description}
                    onChange={handleChange}
                /><br /><br />

                <label>Image URL</label><br />
                <input
                    type='text'
                    name='image'
                    value={gift.image}
                    onChange={handleChange}
                /><br /><br />

                <label>Price Point</label><br />
                <input
                    type='text'
                    name='pricepoint'
                    value={gift.pricepoint}
                    onChange={handleChange}
                /><br /><br />

                <label>Audience</label><br />
                <input
                    type='text'
                    name='audience'
                    value={gift.audience}
                    onChange={handleChange}
                /><br /><br />

                <label>Submitted By</label><br />
                <input
                    type='text'
                    name='submittedby'
                    value={gift.submittedby}
                    onChange={handleChange}
                /><br /><br />

                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default CreateGift