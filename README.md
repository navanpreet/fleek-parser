# Fleek Parser

Parser module that parses swagger documentation and dereference $ref path resolving into full schema object.

Quick reference:
- Best used with the [fleek-router](#usage)
- Best used with the [fleek-validation](#usage)


## Key

- [Usage](#usage)
- [Response Structure](#response-structure)
- [Authors](#authors)

## Usage
```javascript

  var parser = require('fleek-parser');

  //parse document as json object
  var swagger = parser.parse(docs);

  OR

  //parse document as a custom path to the file
  var swagger = parser.parse("[PATH]/swagger.json");


    //your original swagger.json may look like.
    {
      "swagger": "2.0",
      "info": {
        "version": "2.0.0",
        "title": "Swagger Petstore",
        "contact": {
          "name": "Swagger API Team",
          "url": "http://swagger.io"
        }
      },
      "host": "petstore.swagger.io",
      "basePath": "/api",
      "schemes": [
        "http"
      ],
      "paths": {
        "/pets": {
          "get": {
            "tags": [ "Pet Operations" ],
            "summary": "finds pets in the system",
            "responses": {
              "200": {
                "description": "pet response",
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/Pet"
                  }
                }
              }
            }
          }
        }
      },
      "definitions": {
        "Pet": {
          "type": "object",
          "required": [
            "id"
          ],
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64"
            }
          }
        }
      }
    }
```

## Response Structure

- A fully dereferenced JSON is returned  

```javascript
{
  {
      "swagger": "2.0",
      "info": {
        "version": "2.0.0",
        "title": "Swagger Petstore",
        "contact": {
          "name": "Swagger API Team",
          "url": "http://swagger.io"
        }
      },
      "host": "petstore.swagger.io",
      "basePath": "/api",
      "schemes": [
        "http"
      ],
      "paths": {
        "/pets": {
          "get": {
            "tags": [ "Pet Operations" ],
            "summary": "finds pets in the system",
            "responses": {
              "200": {
                "description": "pet response",
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [
                       "id"
                    ],
                    "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int64"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "definitions": {
        "Pet": {
          "type": "object",
          "required": [
            "id"
          ],
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64"
            }
          }
        }
      }
    }
}
```

## Special USE CASE
  Extra property is attached to the returned object to suit fleek-router and fleek-validation usage are:

```javascript

  console.log(swagger.controllers);
  console.log(swagger.routeValidationMap);
  console.log(swagger.sanitizedRoutes);

```

## Authors

- [John Hofrichter](https://github.com/johnhof)
- [Lan Nguyen](https://github.com/lan-nguyen91)
