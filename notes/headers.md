# Headers
## Purpose:
### Headers are key-value pairs sent between the client and server in an HTTP request and response. They provide important metadata about the request or response, such as content type, length, and how to handle the data. Here's a breakdown of common headers and their purposes

## Common HTTP Headers
### Request Headers:

1. **Accept:** Informs the server the types of data the client can handle.
    * Example: `Accept: application/json`
    * Usage:
        ```jsx
            fetch('https://api.example.com/data', {
            headers: {
                'Accept': 'application/json'
            }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        ```
        ```js
            app.get('/data', (req, res) => {
            if (req.headers.accept === 'application/json') {
                res.json({ message: 'Hello, JSON!' });
            } else {
                res.send('Hello, HTML!');
            }
            });
        ```

2. **Authorization:** Contains credentials for authenticating the client with the server.
    * Example: `Authorization: Bearer <token>`
    * Usage:
        ```jsx
            axios.get('https://api.example.com/protected', {
            headers: {
                'Authorization': 'Bearer your_access_token'
            }
            })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));
        ```
        ```js
            app.get('/protected', (req, res) => {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.split(' ')[1];
                // Validate the token...
                res.send('Protected data');
            } else {
                res.status(401).send('Unauthorized');
            }
            });
        ```

3. **Content-Type:** Specifies the media type of the resources or the data being sent.
    * Example: `Content-Type: application/json`
    * Usage:
        ```jsx
            axios.post('https://api.example.com/submit', {
            name: 'John Doe',
            age: 30
            }, {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));
        ```
        ```js
            app.post('/submit', (req, res) => {
            if (req.is('application/json')) {
                console.log(req.body);
                res.send('Data received');
            } else {
                res.status(400).send('Invalid content type');
            }
            });
        ```
4. **User-Agent:** Provides information about the client software initiating the request.
    * Example: `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36`
    * Usage:
        ```jsx
            fetch('https://api.example.com/data', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        ```
        ```js
            app.get('/data', (req, res) => {
            const userAgent = req.headers['user-agent'];
            console.log('User-Agent:', userAgent);
            res.send('Check console for User-Agent');
            });
        ```
### Response Headers:

1. **Content-Type:** Indicates the media type of the resource being sent.
    * Example: `Content-Type: text/html`
    * Usage:
        ```jsx
            axios.post('https://api.example.com/submit', {
            name: 'John Doe',
            age: 30
            }, {
            headers: {
                'Content-Type': 'application/text'
            }
            })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));
        ```
        ```js
            app.post('/submit', (req, res) => {
            if (req.is('application/text')) {
                console.log(req.body);
                res.send('Data received');
            } else {
                res.status(400).send('Invalid content type');
            }
            });
        ```
2. **Content-Length:** Indicates the size of the response body in bytes.
    * Example: `Content-Length: 1234`
    * Usage:
        ```jsx
            // Content-Length is typically set automatically by the browser or client library when making a request with a body.
        ```
        ```js
            app.get('/data', (req, res) => {
                const data = 'Hello, World!';
                res.setHeader('Content-Length', Buffer.byteLength(data));
                res.send(data);
            });
        ```
    
3. **Cache-Control:** Directives for caching mechanisms in both requests and responses.        
    * Example: `Cache-Control: no-cache, no-store, must-revalidate`
    * Usage:
        ```jsx
            fetch('https://api.example.com/data', {
            headers: {
                'Cache-Control': 'no-cache'
            }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        ```
        ```js
            app.get('/data', (req, res) => {
            res.setHeader('Cache-Control', 'no-store');
            res.send('This response should not be cached');
            });
        ```

4. **Set-Cookie:** Used to send cookies from the server to the client.
    * Example: `Set-Cookie: sessionId=abc123; HttpOnly`
    * Usage:
        ```jsx
            // Cookies are automatically handled by the browser and sent with subsequent requests to the same domain.
        ```
        ```js
            app.get('/set-cookie', (req, res) => {
            res.setHeader('Set-Cookie', 'sessionId=abc123; HttpOnly');
            res.send('Cookie set');
            });

        ```

5. **Content-Disposition:** Specifies if the be displayed inline(**Indicates that the content should be displayed within the browser.**) or treated as an attachement(**Indicates that the content should be downloaded and saved locally and named using the filename config**).
    * Example: `Content-Disposition: inline /(or) attachement; filename="example.pdf"`
    * Usage:
        ```jsx
        // Content-Disposition is handled in the server side
        ```
        ```js
            app.get('/download', (req, res) => {
            const file = `${__dirname}/files/sample.pdf`;
            res.setHeader('Content-Disposition', 'attachment; filename="sample.pdf"');
            res.sendFile(file);
            });

            app.get('/view', (req, res) => {
            const file = `${__dirname}/files/sample.pdf`;
            res.setHeader('Content-Disposition', 'inline');
            res.sendFile(file);
            });
        ```