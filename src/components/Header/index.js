import { Image, Navbar, Nav } from 'react-bootstrap';
import "./index.css";

export default function Header() {
    return (
        <Navbar bg="light" variant="light" expand="lg" className='header'>
            <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-center align-items-center'>
                <Nav className="mr-auto">
                    <Nav.Link href="https://transfercompass.com/" className='me-5'>
                        <div className='d-flex'>
                            <Image src="https://transfercompass.com/wp-content/uploads/2023/09/Idea-2-e1694436408723.png" height={32} />
                            <p className='h4 ms-2'>Transfer Compass</p>
                        </div>
                    </Nav.Link>
                    <Nav.Link href="https://transfercompass.com/" className='d-flex align-items-center me-4'>
                        <p className='h7 subhead'>Home</p>
                    </Nav.Link>
                    <Nav.Link href="/" className='d-flex align-items-center me-4'>
                        <p className='h7 subhead'>School Profiles</p>
                    </Nav.Link>
                    <Nav.Link href="https://transfercompass.com/contact-us/" className='d-flex align-items-center'>
                        <p className='h7 subhead'>Contact Us</p>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}