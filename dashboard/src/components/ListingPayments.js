import React, { useState } from 'react';
import { Col, Input, Label, Row, Table } from 'reactstrap';

function ListingPayments(props) {

    const { items } = props;
    const [filterText, setFilterText] = useState('');
    const searchFields = ['id', 'date', 'amount', 'currency', 'memo', 'sender', 'receiver'];

    const mostRecentItems = () => {
        return items.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA > dateB) {
                return -1;
            }
            if (dateA < dateB) {
                return 1;
            }
            return 0;
        });
    }

    const filteredItems = (text) => {
        return mostRecentItems().filter(item => {
            return searchFields.some(field => {
                if (field === 'sender' || field === 'receiver') {
                    return item[field].name.toLowerCase().includes(text);
                }
                return item[field].toLowerCase().includes(text);
            });
        });
    };

    return (
        <>
            <Row style={{marginTop: 30}}>
                <Col sm={12}>
                    <Label>
                        <h5>Search</h5>
                    </Label>
                    <Input type='text' placeholder='Filter results by typing here'
                        value={filterText}
                        onChange={
                            e => {
                                setFilterText(e.target.value);
                                filteredItems(filterText);
                            }
                        }
                    />
                </Col>
            </Row>
            <Table striped style={{ marginTop: 25 }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Amount</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredItems(filterText).map((item, ndx) => {
                            return (
                                <tr key={item.id}>
                                    <td>{ndx + 1}</td>
                                    <td>{item.sender.name}</td>
                                    <td>{item.receiver.name}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.currency}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default React.memo(ListingPayments);
