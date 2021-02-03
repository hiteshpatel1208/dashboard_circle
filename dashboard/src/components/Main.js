import React, {useEffect, useState} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import ListingPayments from './ListingPayments';
import CreatePayment from './CreatePayment';
import Header from './Header';

function Main() {

    const [data, setData] = useState([]);
	const [users, setUsers] = useState([]);

	const fetchTransaction = () => {
		fetch('/payments')
			.then(res => res.json())
			.then(res => setData(prevData => prevData.concat(res.data)))
			.catch(err => console.log(err));
	}

	const fetchUsers = () => {
		fetch('/users')
			.then(res => res.json())
			.then(res => setUsers(res.data))
			.catch(err => console.log(err));
	}

	const addTransaction = (data) => {
		setData(prevData => prevData.concat(data));
	}

	useEffect(() => {
		const interval = setInterval(fetchTransaction, 1000);
        
        setTimeout(() => {
			clearInterval(interval);
		}, 25000);

		fetchUsers();

    }, []);

    return (
        <>
            <Header />
            <Switch>
                <Route path='/listing' component={() => <ListingPayments items={data} />} />
                <Route path='/create' component={() => <CreatePayment userDetails={users} addTransaction={addTransaction} />} />
                <Redirect to='/listing' />
            </Switch>
        </>
    )
}

export default withRouter(Main);
