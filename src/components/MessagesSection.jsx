import React, { useState, useEffect } from 'react';
import { fetchContactMessages, deleteContactMessage } from '../services/contactService';

const MessagesSection = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await fetchContactMessages();
      // Extract the data array from the response
      setMessages(response.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContactMessage(id);
        setMessages(messages.filter((message) => message._id !== id));
      } catch (err) {
        alert('Failed to delete message');
        console.error(err);
      }
    }
  };

  const handleEmail = (email, name) => {
  
  const subject = encodeURIComponent('Thank you for contacting Artnoxx');
  
  const body = encodeURIComponent(
    `Hi ${name},\n\n` +
    `Thank you for reaching out to Artnoxx! We received your message and appreciate your interest in our services.\n\n` +
    `We'll get back to you shortly with a detailed response.\n\n` +
    `Best regards,\n` +
    `The Artnoxx Team`
  );
  
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  window.open(gmailUrl, '_blank');
};


  const handleWhatsApp = (phone, name) => {
    const text = encodeURIComponent(`Hi ${name}, thanks for contacting us!`);
    const whatsappUrl = `https://wa.me/${phone}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Contact Messages
      </h2>
      
      {messages.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No messages found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((message) => (
            <div 
              key={message._id} 
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 truncate">
                  {message.name}
                </h3>
                <button 
                  onClick={() => handleDelete(message._id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                  title="Delete message"
                >
                  ✕
                </button>
              </div>
              
              {/* Card Body */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Email:</p>
                  <p className="text-gray-800 break-words">{message.email}</p>
                </div>
                
                {message.number && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone:</p>
                    <p className="text-gray-800">{message.number}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Message:</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md text-sm leading-relaxed">
                    {message.message}
                  </p>
                </div>
                
                {message.createdAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(message.createdAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </p>
                )}
              </div>
              
              {/* Card Actions */}
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={() => handleEmail(message.email, message.name)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <span>📧</span>
                  <span>Email</span>
                </button>
                
                <button 
                  onClick={() => handleWhatsApp(message.number, message.name)}
                  disabled={!message.number}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesSection;
