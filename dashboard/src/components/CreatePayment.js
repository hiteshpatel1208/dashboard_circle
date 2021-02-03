import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Seedrandom from 'seedrandom';

function CreatePayment(props) {

    const [senderFname, setSenderFname] = useState('');
    const [senderLname, setSenderLname] = useState('');
    const [recFname, setRecFname] = useState('');
    const [recLname, setRecLname] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('BTC');
    const [memo, setMemo] = useState('');
    const [userNdx, setUserNdx] = useState(0);

    const nowMS = new Date();
    const epochSeconds = Math.round(nowMS.getTime() / 1000);
    const prng = new Seedrandom(epochSeconds);
    const now = new Date(epochSeconds * 1000);

    const handleSubmit = (e) => {
        e.preventDefault();
        let payLoad = preparePayload();
        fetch('/payments', {
            method: 'POST',
            body: JSON.stringify(payLoad),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 201) {
                props.addTransaction(preparePayload());
            } else {
                handleSubmit(e);
            }
        })
        resetForm();
    }

    const resetForm = () => {
        setUserNdx(Math.floor(Math.random() * (props.userDetails.length - 1)));
        setAmount('');
        setCurrency('BTC');
        setMemo('');
    }

    const preparePayload = () => {
        return {
            id: Math.round(prng.quick() * 1e16).toString(),
            date: now.toISOString(),
            sender: props.userDetails[userNdx],
            receiver: props.userDetails[userNdx +1],
            amount: amount,
            currency: currency,
            memo: memo
        }
    }

    useEffect(() => {
        if (props.userDetails.length > 0) {
            const sender = props.userDetails[userNdx].name;
            const receiver = props.userDetails[userNdx + 1].name;
            setSenderFname(sender.split(' ')[0]);
            setSenderLname(sender.split(' ')[1]);
            setRecFname(receiver.split(' ')[0]);
            setRecLname(receiver.split(' ')[1]);
        }
    }, [props.userDetails, userNdx]);

    return (
        <>
            <div className='row' style={{ marginTop: 30 }}>
                <div className='col-12'>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <h5>
                                Sender Information
                            </h5>
                        </FormGroup>
                        <Row className='form-group'>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>
                                        First Name
                                    </Label>
                                    <Input
                                        type='text'
                                        name='senderFname'
                                        placeholder='Enter First Name'
                                        value={senderFname}
                                        onChange={e => setSenderFname(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>
                                        Last Name
                                    </Label>
                                    <Input
                                        type='text'
                                        name='senderLname'
                                        placeholder='Enter Last Name'
                                        value={senderLname}
                                        onChange={e => setSenderLname(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <h5>
                                Receiver Information
                            </h5>
                        </FormGroup>
                        <Row className='form-group'>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>
                                        First Name
                                    </Label>
                                    <Input
                                        type='text'
                                        name='recFname'
                                        placeholder='Enter First Name'
                                        value={recFname}
                                        onChange={e => setRecFname(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>
                                        Last Name
                                    </Label>
                                    <Input
                                        type='text'
                                        name='recLname'
                                        placeholder='Enter Last Name'
                                        value={recLname}
                                        onChange={e => setRecLname(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <h5>
                                Transaction Details
                            </h5>
                        </FormGroup>
                        <Row className='form-group'>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>
                                        Amount
                                    </Label>
                                    <Input
                                        type='text'
                                        name='amount'
                                        placeholder='Enter transaction amount'
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>
                                        Currency
                                    </Label>
                                    <Input
                                        type='select'
                                        name='currency'
                                        value={currency}
                                        onChange={e => setCurrency(e.target.value)}
                                    >
                                        <option>BTC</option>
                                        <option>GBP</option>
                                        <option>EUR</option>
                                        <option>JPY</option>
                                        <option>USD</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col sm={12}>
                                <FormGroup>
                                    <Label>
                                        Memo
                                    </Label>
                                    <Input
                                        type='textarea'
                                        placeholder='Enter details'
                                        value={memo}
                                        onChange={e => setMemo(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col sm={3}>
                                <Button type='submit' color='primary'>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default React.memo(CreatePayment);