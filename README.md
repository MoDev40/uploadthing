# UploadthingDemo

This is a web application that allows users to upload various file types, including images, PDFs, text files, and Microsoft Office documents. The application uses the `uploadthing` cloud service to handle file uploads and saves the file URLs to a MongoDB database using Redux Toolkit's `RTK Query`.

## Supported File Types

The application supports the following file types:

```json
{
  "images": {
    "maxFileSize": "8MB",
    "maxFileCount": 1
  },
  "pdfs": {
    "maxFileSize": "8MB",
    "maxFileCount": 1
  },
  "textFiles": {
    "maxFileSize": "8MB",
    "maxFileCount": 1
  },
  "microsoftWordDocuments": {
    "maxFileSize": "8MB",
    "maxFileCount": 1
  },
  "microsoftPowerPointPresentations": {
    "maxFileSize": "8MB",
    "maxFileCount": 1
  },
  "microsoftExcelSpreadsheets": {
    "maxFileSize": "8MB",
    "maxFileCount": 1
  },
  "microsoftWordDocumentsInDOCXFormat": {
    "maxFileSize": "8MB",
    "maxFileCount": 1
  },
  "microsoftExcelSpreadsheetsInXLSXFormat": {
    "maxFileSize": "8MB",
    "maxFileCount": 1
  },
  "microsoftPowerPointPresentationsInPPTXFormat": {
    "maxFileSize": "16MB",
    "maxFileCount": 1
  }
}
```

## Uploadthing Data Return Type

When a file is successfully uploaded using `uploadthing`, the returned data structure is as follows:

```ts
[
  {
    customId: null,
    key: string,
    name: string,
    serverData: { uploadedBy: string },
    size: number,
    type: string,
    url: string
  }
]
```

Example usage:

```js
onClientUploadComplete={async (res) => {
  const file = {
    name: res[0].name,
    size: res[0].size,
    type: res[0].type,
    url: res[0].url,
    key: res[0].key
  }
}}
```

## File Types

Refer to [Common MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) on MDN for more details on file types.

## Features

- Supports the file types listed above.
- Saves the uploaded file URLs to a MongoDB database using Redux Toolkit's `RTK Query`.

## Installation

1. Clone the repository: 

    ```bash
    git clone https://github.com/MoDev40/uploadthing.git
    ```

2. Install the dependencies: 

    ```bash
    cd uploadthing 
    npm install
    ```

3. Set up the environment variables:

    - Create a `.env` or `.env.local` file in the project root directory.
    - Add the necessary environment variables, such as the MongoDB connection string and the `UPLOADTHING_SECRET` configuration.

4. Start the development server: 

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

1. Drag and drop or click to select files to upload.
2. The uploaded files will be saved to the MongoDB database, and their URLs will be available in the application.

## Technology Stack

- React
- Redux Toolkit
- MongoDB
- [`uploadthing cloud service`](https://uploadthing.com)

This demo showcases the integration of `uploadthing`, `RTK Query`, and MongoDB for file uploads.