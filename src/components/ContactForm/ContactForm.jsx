import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  FormContainer,
  FormField,
  Label,
  Input,
  Span,
  Button,
  ButtonField,
} from './ContactForm.styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <Formik>
        <Form onSubmit={this.handleSubmit}>
          <FormContainer>
            <FormField>
              <Label>
                <Span>Name</Span>
                <Input
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
                  required
                />
              </Label>
            </FormField>
            <FormField>
              <Label>
                <Span>Phone Number</Span>
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  name="number"
                  value={number}
                  onChange={this.handleChange}
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
                />
              </Label>
            </FormField>
            <ButtonField>
              <Button type="submit">Add Contact</Button>
            </ButtonField>
          </FormContainer>
        </Form>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
