import React, { useState, useMemo, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OneMovie from '../../components/oneMovie';
//import LoadingContext from '../../utils/loadingContext';

const Search = (props) => {
    //const loadingContext = useContext(LoadingContext)

    const [searchTitle, setSearchTitle] = useState(props.match.params.movie_title !== " " ? props.match.params.movie_title : '');
    const [searchResults, setSearchResults] = useState([]);

    const renderSearch = useMemo(() => {
        return searchResults.map((oneResult, index) => {
            return <OneMovie key={oneResult.id} index={index} {...oneResult} />;
        });
    }, [searchResults])

    const handleSearch = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            },
        }
        fetch(`http://localhost:4001/search?movie_title=${encodeURIComponent(searchTitle)}`, requestOptions)
            .then(res => res.json())
            .then(movie_details => {
                if (movie_details.status) {
                    throw new Error(movie_details.error)
                } else {
                    setSearchResults(movie_details.results)
                }
            })
            .catch((e) => {
                toast.error('' + e);
            });

    };

    useEffect(() => {
        if (searchTitle !== "") {
            handleSearch({ target: { value: searchTitle }, preventDefault: () => {} })
        }
    }, [])

    return (
        <Container fluid className="pt-5">
            <Row className="justify-content-md-center pb-3">
                <Col sm={4}>
                    <Form style={{ width: "400px" }} className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            name="search"
                            placeholder="Search by movie title ..."
                            type="search"
                            className="mr-2"
                            value={searchTitle}
                            onChange={e => setSearchTitle(e.target.value)}
                            aria-label="Search"
                        />
                        <Button variant="outline-success" type="submit" disabled={searchTitle === ""} style={{marginLeft: "10px"}}>Search</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                {renderSearch}
            </Row>
        </Container>
    );
};

export default Search;