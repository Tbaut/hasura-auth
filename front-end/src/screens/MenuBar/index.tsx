import * as React from 'react';
import { useContext, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import { UserDetailsContext } from '../../context/UserDetailsContext'
import { getLocalStorageToken } from '../../services/auth.service';
import parseJwt from '../../util/parseJWT'

const MenuBar: React.FC = () => {
	const currentUser = useContext(UserDetailsContext)

	useEffect(() => {
		if (!currentUser.id){
			// no user stored in memory
			// check in the local storage
			const token = getLocalStorageToken()
			if (token) {
				const tokenPayload = token && parseJwt(token);

				if (tokenPayload){
					const id = tokenPayload && tokenPayload['https://hasura.io/jwt/claims']['x-hasura-user-id']
					const username =  tokenPayload.name
	
					if (id && username){
						currentUser.setUserDetailsContextState((prevState) => {
							return {
								...prevState,
								id,
								username
							}
						})
					}
				}
			}
		}
	},[currentUser]);

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand as={Link} to="/">Governance Platform</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ml-auto">
					{currentUser.username
						? <Navbar.Text>Hello {currentUser.username}</Navbar.Text>
						: <>
							<Nav.Link as={Link} to="/temp-login">Login</Nav.Link >
							<Nav.Link as={Link} to="/temp-signup">Sign-up</Nav.Link >
						</>
					}
            
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MenuBar;