interface Props {
    text: string
    reference: string
    backgroundColor?: string
    fontSize?: number
    textColor?: string
    referenceTextColor?: string
    margin?: number
    fontFamily?: string
}

const defaultProps: Props = {
    text: '',
    reference: '',
    backgroundColor: '#000',
    fontSize: 32,
    textColor: '#fff',
    referenceTextColor: '#fff',
    margin: 80,
    fontFamily: 'Franklin Gothic Demi, Arial Narrow, Arial, sans-serif'
}

export function getBibleVerseHTML(props: Props): string {
    props = Object.assign({}, defaultProps, props)
    return `
    <html>

    <head>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
    
            html,
            body {
                height: 100%;
                width: 100%;
            }
    
            html {
                font-size: ${props.fontSize}px;
            }
    
            body {
                background-color: ${props.backgroundColor};
                color: #fff;
                font-family: ${props.fontFamily};
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: ${props.margin}px;
            }
    
            .text-container {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
                text-align: center;
            }
    
            .text {
                font-size: 2rem;
                font-weight: bold;
                text-align: start;
                color: ${props.textColor};
            }
    
            .reference-container {
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                width: 100%;
            }
    
            .reference-text {
                font-size: 1.5rem;
                font-weight: bold;
                color: ${props.referenceTextColor};
            }
        </style>
    </head>
    
    <body>
        <div class="text-container">
            <span class="text">${props.text}</span>
        </div>
        <div class="reference-container">
            <span class="reference-text">${props.reference}</span>
        </div>
    </body>
    
    </html>
`
}