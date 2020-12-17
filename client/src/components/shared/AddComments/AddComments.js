import React, { Component } from 'react'
import CommentsService from './../../../service/comments.service'
import Loader from '../../shared/Spinner/Loader'
import { Link } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import './AddComments.css'


class AddComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {
                content: '',
                user: this.props.loggedUser._id || '',
                course: this.props.courseId || ''
            }
        }
        this.commentsService = new CommentsService()

    }


    handleInputChange = e => this.setState({ comment: { ...this.state.comment, [e.target.name]: e.target.value } })


    handleSubmit = e => {
        e.preventDefault()

        this.commentsService
            .saveComment(this.state.comment)
            .then(() => {
                this.props.refreshCourse()
                this.setState({ content: '' })
            })
            .catch(err => console.log(err))

    }


    render() {
        console.log(this.props)
        return (
            <Row>
                <Col>
                    <h2 className="mt-4 mb-3">Add a Comment</h2>
                    <Form className="comment-form" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="content">
                            <Form.Control as='textarea' name="content" value={this.state.content} onChange={this.handleInputChange} placeholder="Write your comment..." />
                        </Form.Group>
                        <Button className="btn start-course" type="submit"> Submit</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default AddComments