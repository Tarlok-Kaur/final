import MainNav from "./MainNav"
import Container from 'react-bootstrap/Container';
export default function Layout(props){
    return(
        <>
            <br />
            <MainNav />
            <br />
            <Container>
                {props.children}
            </Container>
            <br />
            <br />
        </>
    )
}