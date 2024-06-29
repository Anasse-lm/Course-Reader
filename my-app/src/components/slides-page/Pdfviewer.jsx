import { Document, Image, Text, Page } from "react-pdf"
export default function Pdfviewer()
{
    const styles = StyleSheet({
        color: 'black',
        backgroundColor: '#eee',
        width: '70%',
        padding: '1rem',
        heigth: window.innerHeight - 100
    })
    return (
        <div className="pfd-viewer-div" style={styles}>
            <Document>
                <Text>Hello pdf</Text>
            </Document>
        </div>
    )
}