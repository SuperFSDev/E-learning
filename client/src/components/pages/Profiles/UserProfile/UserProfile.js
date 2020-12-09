import { Container, Image, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import UsersServices from './../../../../service/users.service'
import CoursesServices from './../../../../service/courses.service'
import './UserProfile.css'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      courses: undefined   // cambiará
    }

    this.usersServices = new UsersServices()
    this.coursesServices = new CoursesServices()
  }

  // /////////////////////
  // componentDidMount = () => {
  //   this.coursesServices
  //     .getTeacherCourses(this.props.teacherInfo._id)
  //     .then(response => this.setState({ courses: response.data }))
  //     .catch(err => console.log(err))
  // }

  // ///////////////////////////7


  // deleteAll = () => {

  //   //hay teacher?
  //   if (this.props.teacherInfo) {

  //     //hay cursos?
  //     if (this.state.courses) {
  //       this.deleteOnlyTeacherCourses()
  //       this.deleteOnlyTeacher()
  //       this.deleteOnlyUser()
  //     }

  //     //teacher no courses
  //     if (!this.state.courses) {
  //       this.deleteOnlyTeacher()
  //       this.deleteOnlyUser()
  //     }

  //   }

  //   //no teacher
  //   if (!this.props.teacherInfo) {
  //     this.deleteOnlyUser()
  //   }
  // }

  // // delete teacher's courses 
  // deleteOnlyTeacherCourses = () => {
  //   this.coursesServices
  //     .deleteTeacherCourses(this.props.teacherInfo._id)
  //     .then(response => console.log(response))
  //     .catch(err => console.log('error al borrar el teacher', err))   // TO-DO  Tostada

  // }

  // // delete teacher no courses created
  // deleteOnlyTeacher = () => {

  //   this.teachersServices
  //     .deleteTeacher(this.props.teacherInfo._id)
  //     .then(response => console.log(response))
  //     .catch(err => console.log('desde el catch de teacher', err))    // TO-DO  Tostada
  // }

  // // delete user with no teacher no courses created
  // deleteOnlyUser = () => {

  //   this.usersServices
  //     .deleteUser(this.props.loggedUser._id)
  //     .then(response => {
  //       this.props.storeUser(undefined)
  //       this.props.history.push('/')
  //     })
  //     .catch(err => console.log('Failed to delete', err))    // TO-DO  Tostada

  // }


  render() {
    return (

      <Container>
        <h1 className="mb-5">Welcome back {this.props.loggedUser.username} !</h1>
        <hr></hr>
        {/* User details */}
        <Row>
          <Col md={1}>
            <Image src={this.props.loggedUser.imageUrl} className="user-img" roundedCircle alt={this.props.loggedUser.username} />
          </Col>
          <Col md={{ span: 10, offset: 1 }}>
            <p><strong>Username:</strong> {this.props.loggedUser.username}</p>
            <p><strong>Email:</strong> {this.props.loggedUser.email}</p>
            <p><strong>Role:</strong> {this.props.loggedUser.role}</p>
            <Link to='/profile/edit-user' className="btn btn-info">Edit your user details</Link>
            <Button to={`/profile/delete-user/${this.props.loggedUser._id}`} onClick={this.deleteAll} className="btn btn-danger">Delete your account</Button>
          </Col>
        </Row>
        <hr></hr>
        <Row className="mt-5">
          <Col md={6}>
            {this.props.loggedUser.role === 'Teacher' && this.props.teacherInfo
              ?
              <Link to='/profile-teacher' className="btn btn-warning" >View your teacher profile</Link>
              : this.props.loggedUser.role === 'Teacher' && !this.props.teacherInfo ?
                <Link to='/profile/create-teacher' className="btn btn-success">Create your teacher profile</Link>
                : null
            }
          </Col>
        </Row>
        <Row>
          <h2 className="mt-5">Your favourite Courses</h2>
        </Row>
      </Container>
    )
  }
}


export default UserProfile