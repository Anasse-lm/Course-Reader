
# React PDF Notes

## Creating PDFs Programmatically using `@react-pdf/renderer`

### Installation

```bash
npm install @react-pdf/renderer
```

### Basic Usage

1. **Import the necessary components**:
    ```javascript
    import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
    ```

2. **Create a PDF document**:
    ```javascript
    const MyDocument = () => (
      <Document>
        <Page>
          <View>
            <Text>Hello, world!</Text>
          </View>
        </Page>
      </Document>
    );
    ```

3. **Render and Download the PDF**:
    ```javascript
    const App = () => (
      <div>
        <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    );
    ```

### Styling the PDF

- **Define styles using `StyleSheet.create`**:
    ```javascript
    const styles = StyleSheet.create({
      page: { flexDirection: 'row', backgroundColor: '#E4E4E4' },
      section: { margin: 10, padding: 10, flexGrow: 1 }
    });
    ```

- **Apply styles to components**:
    ```javascript
    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    );
    ```

## Reading Existing PDF Files using `react-pdf`

### Installation

```bash
npm install @react-pdf-viewer
```

### Basic Usage

1. **Import the necessary components**:
    ```javascript
    import { Document, Page } from 'react-pdf';
    import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
    ```

2. **Load and display a PDF document**:
    ```javascript
    const MyApp = () => {
      const [numPages, setNumPages] = useState(null);

      function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }

      return (
        <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      );
    };
    ```

## Displaying HTML Files as PDFs

### Steps to Convert HTML to PDF

1. **Read the HTML file**:
    ```javascript
    fetch('path/to/your/file.html')
      .then(response => response.text())
      .then(html => {
        // Process the HTML content
      });
    ```

2. **Convert HTML content to PDF** using libraries like `html-pdf` or `puppeteer` on the server side and serve it to the React application.

### Example using `html-pdf`

1. **Install `html-pdf`**:
    ```bash
    npm install html-pdf
    ```

2. **Create a server-side script to convert HTML to PDF**:
    ```javascript
    const pdf = require('html-pdf');
    const fs = require('fs');

    fs.readFile('path/to/your/file.html', 'utf8', (err, html) => {
      if (err) {
        console.error('Error reading HTML file:', err);
        return;
      }
      
      pdf.create(html).toFile('path/to/output.pdf', (err, res) => {
        if (err) {
          console.error('Error creating PDF:', err);
          return;
        }
        console.log('PDF created successfully:', res);
      });
    });
    ```

3. **Fetch and display the generated PDF in your React application**:
    ```javascript
    const MyApp = () => {
      return (
        <embed src="path/to/output.pdf" width="600" height="800" type="application/pdf" />
      );
    };
    ```
