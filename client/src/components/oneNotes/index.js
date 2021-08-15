import React, { useContext, useState, useEffect } from "react"
import { Row, Col, Form, Button } from "react-bootstrap"
import UserContext from "../../utils/userContext"
import { toast } from 'react-toastify'

function OneNote(props) {

    const userContext = useContext(UserContext)
    const [note, setNote] = useState("")

    const handleNote = (e) => {
        e.preventDefault();
        if (userContext.user.loggedIn) {
            userContext.addNotes(userContext.user, { id: props.id, note })
        } else {
            toast.error("You need to log in first!")
        }
    }

    const removeNote = () => {
        userContext.removeNotes(userContext.user, props.id)
        setNote("")
    }

    useEffect(() => {
        if (userContext.user.loggedIn) {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json",
                        'x-access-token': userContext.user.user.token
                    }
                }

                fetch(`http://localhost:4001/notes`, requestOptions)
                    .then(res => res.json())
                    .then(fetchNotes => {
                        let oneNote = fetchNotes.filter(note => note.id === props.id)
                        oneNote.length !== 0 ? setNote(oneNote[0].note) : setNote("")
                        
                    })

            } catch (e) {
                console.log(e)
                toast.error('' + e)
            }
        }

    }, [])

    return (
        <Row className="m-2">
            <Col xl={{ span: 4, offset: 1 }} className="mt-3">
                <Form onSubmit={handleNote}>
                    <Form.Group className="mb-2" >
                        <Form.Label><h4><strong>Your comments:</strong></h4></Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5} 
                            value={note} 
                            onChange={(e) => setNote(e.target.value)} 
                            placeholder="Your private notes and comments about the movie ..."
                            />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>

            </Col>
            {userContext.user.loggedIn && note ?
                <Col xl={{ span: 3 }} style={{paddingTop: '60px'}}>
                    <Button onClick={removeNote}>Remove your note</Button>
                </Col>
                :
                ''
            }
        </Row>
    )

}

export default OneNote