# fetch-exif

The `fetch-exif` is a Node.js application that provides two endpoints for retrieving EXIF and GPS data from image URLs.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/darmau/fetch-exif.git
cd fetch-exif
npm install
```

## Usage

Start the server using the following command:

```bash
npm start
```

The server is now running on `http://localhost:1216` by default.

To retrieve the EXIF data of an image, make a GET request to the `/exif` endpoint with the `url` query parameter set to the URL of the image:

```
GET /exif?url=imageurl
```

This will return a JSON object containing the EXIF data of the image.

To retrieve the GPS data of an image, make a GET request to the `/gps` endpoint with the `url` query parameter set to the URL of the image:

```
GET /gps?url=imageurl
```

This will return a JSON object containing the GPS data of the image.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.