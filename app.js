(function () {
  const { useState } = React;

  function App() {
    const [message, setMessage] = useState('Chat is now visible!');

    return React.createElement('div', { style: { padding: '20px', color: 'white' } },
      React.createElement('h1', null, 'P2P WebRTC Chat'),
      React.createElement('p', null, message),
      React.createElement('button', { onClick: () => setMessage('Button clicked!') }, 'Click Me')
    );
  }

  const rootElement = document.getElementById('root');
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
})();
