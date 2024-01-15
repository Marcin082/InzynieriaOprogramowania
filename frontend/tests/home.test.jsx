import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { Home } from '../src/components/home';

// Mocking axios.post
jest.mock('axios');

describe('Home component', () => {
  it('handles chatbot submit successfully', async () => {
    const mockMessage = 'Hello, chatbot!';
    const mockResponse = { data: 'Chatbot response' };
    
    // Mocking axios.post implementation
    axios.post.mockResolvedValue(mockResponse);

    // Render the Home component
    render(<Home />);

    // Find the chat input
    const chatInput = screen.getByTestId('chat-input');

    // Simulate user input
    fireEvent.change(chatInput, { target: { value: mockMessage } });

    // Trigger the form submission
    fireEvent.submit(chatInput.closest('form'));

    // Wait for the asynchronous code to complete
    await waitFor(() => {
      // Check if the axios.post method was called with the correct arguments
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/sendMessage', { message: mockMessage });

      // Check if the chat history is updated correctly
      expect(screen.getByText(mockMessage)).toBeInTheDocument();
      expect(screen.getByText(mockResponse.data)).toBeInTheDocument();
    });
  });

  it('handles chatbot submit with error', async () => {
    const mockMessage = 'Hello, chatbot!';
    const expectedErrorMessage = 'Error sending message to chatbot: Test error';

    // Mocking axios.post implementation to simulate an error
    axios.post.mockRejectedValue(new Error('Test error'));

    // Mocking console.error
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Render the Home component
    render(<Home />);

    // Find the chat input
    const chatInput = screen.getByTestId('chat-input');

    // Simulate user input
    fireEvent.change(chatInput, { target: { value: mockMessage } });

    // Trigger the form submission
    fireEvent.submit(chatInput.closest('form'));

    // Wait for the asynchronous code to complete
    await waitFor(() => {
      // Check if the axios.post method was called with the correct arguments
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/sendMessage', { message: mockMessage });

      // Check if the error message is logged
      expect(consoleErrorMock).toHaveBeenCalled();

      // Check if the error message contains the expected substring
      const receivedErrorArgs = consoleErrorMock.mock.calls[0];
      const receivedErrorMessage = receivedErrorArgs.join(' ');
      expect(receivedErrorMessage).toEqual(expectedErrorMessage);
    });

    // Restore the original console.error implementation
    consoleErrorMock.mockRestore();
  });
});
