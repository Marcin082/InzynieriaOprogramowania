import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatbotInput from '../src/components/input'; // Adjust the path accordingly

describe('ChatbotInput', () => {
  it('renders the component', () => {
    const { getByPlaceholderText, getByTestId } = render(<ChatbotInput />);
    
    // Check if the input and button are rendered
    expect(getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(getByTestId('send-icon')).toBeInTheDocument();
  });

  it('updates input text on change', () => {
    const { getByPlaceholderText } = render(<ChatbotInput />);
    const inputElement = getByPlaceholderText('Type your message...');

    // Simulate user typing in the input
    fireEvent.change(inputElement, { target: { value: 'Hello, Chatbot!' } });

    // Check if the input value has been updated
    expect(inputElement.value).toBe('Hello, Chatbot!');
  });

  it('calls onSubmit when the form is submitted', () => {
    const mockOnSubmit = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(<ChatbotInput onSubmit={mockOnSubmit} />);
    const inputElement = getByPlaceholderText('Type your message...');

    // Simulate user typing in the input
    fireEvent.change(inputElement, { target: { value: 'Hello, Chatbot!' } });

    // Simulate form submission
    fireEvent.submit(getByTestId('input-form'));

    // Check if onSubmit has been called with the correct argument
    expect(mockOnSubmit).toHaveBeenCalledWith('Hello, Chatbot!');
  });
});
