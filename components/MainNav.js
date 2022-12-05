import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store.js';
import { addToHistory } from "../lib/userData.js";
import { readToken, removeToken } from '../lib/authenticate';

export default function MainNav() {
    const router = useRouter();
    let token = readToken();
    function doNavigation(e, route){
        router.push(route);
      };
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchField, setSearchField] = useState(null);
    
    function logout() {
      setIsExpanded(false);
      removeToken();
      router.push('/login');
    }

    async function submitForm(e) {
      e.preventDefault(); // prevent the browser from automatically submitting the form
      setIsExpanded(false)
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
    }
    
  if(token){  
  return (
    <>
      <Navbar className= "fixed-top navbar-dark bg-primary"  expand="lg" expanded={isExpanded}>
        <Container  >
          <Navbar.Brand className="navbar-brand"> Tarlok Kaur</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" onClick={(e)=>setIsExpanded(!isExpanded)}/>
            <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto"
                    style={{ maxHeight: '100px' }}
                    navbarScroll>
                    <Link href='/' legacyBehavior passHref><Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link></Link>
                    <Link href='/search' legacyBehavior passHref><Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
                </Nav>
                &nbsp;
                <Form className="d-flex" onSubmit={submitForm}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearchField(e.target.value)}
                    />
                    <Button onClick={(e)=>{doNavigation(e, `/artwork?title=true&q=${searchField}`)}} type="submit" variant="outline-success">Search</Button>
                </Form>
                &nbsp;
                <Nav>
                  <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href='/favourites' legacyBehavior passHref><NavDropdown.Item onClick={(e)=>setIsExpanded(false)} >Favourites</NavDropdown.Item></Link>
                    <Link href='/history' legacyBehavior passHref><NavDropdown.Item onClick={(e)=>setIsExpanded(false)} >Search History</NavDropdown.Item></Link>
                    <NavDropdown.Item onClick={(e)=> logout()} >Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                
                
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      
    </>
  );
  }
  else{
    return (
      <>
        <Navbar className= "fixed-top navbar-dark bg-primary solid navbar navbar-expand-lg navbar-dark"  expand="lg" expanded={isExpanded}>
          <Container>
            <Navbar.Brand className="navbar-brand"> Tarlok Kaur</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" onClick={(e)=>setIsExpanded(!isExpanded)}/>
              <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto"
                      style={{ maxHeight: '100px' }}
                      navbarScroll>
                      <Link href='/' legacyBehavior passHref><Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link></Link>
                  </Nav>
                   <Nav>
                    <Link href='/register' legacyBehavior passHref><Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                    <Link href='/login' legacyBehavior passHref><Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/login"}>Login</Nav.Link></Link>
                    </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br />
        <br />
      </>
    );
  }
}

