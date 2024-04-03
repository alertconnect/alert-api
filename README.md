<p align="center">
  <a href="https://github.com/alertconnect/alert-api" target="blank"><img src="app_logo.png" width="500" alt="AlertConnect Alert API App Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
This project is a small service built with Nest.js dedicated to handling alerts, sectors, and other data for the Protezione Civile Nazionale alert systems.
</p>
<p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/alertconnect/alert-api" alt="NPM Version" /></a>
    <a href="https://github.com/alertconnect/alert-api/blob/main/LICENSE.md" target="_blank"><img alt="GitHub License" src="https://img.shields.io/github/license/alertconnect/alert-api"></a>
</p>

## Getting Started
Follow these instructions to set up the project on your local machine for development and testing purposes.
- Clone the repository to your local machine: `git clone https://github.com/alertconnect/alert-api.git`
- Install dependencies: `yarn install`
- Start the application in development: `yarn start:dev`
- Visit `http://localhost:3000` in your browser to use the application.

## Requirements
- [Node.js](https://nodejs.org/en/download/) 20 or higher
- [Yarn](https://yarnpkg.com/en/) 1.10.1 or higher

## Built With
- [Nest.js](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## Registry push
After releasing a new version, you need to push the new version to the registry.
> Access to the registry is required.
```bash
$ docker login registry.gitlab.com
$ docker build -t registry.gitlab.com/alertconnect/alert-api:<VERSION> .
$ docker push registry.gitlab.com/alertconnect/alert-api:<VERSION>
```

## Contributing
Contributions are welcome! If you want to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Make your changes.
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/your-feature).
- Create a new Pull Request.

## Environment Variables
| code           | description    | default value |
|----------------|----------------|---------------|
| APP_PORT       | App port       | 8080          |
| DATABASE_URL   | Database Host  | localhost     |
| API_KEY        | Auth token     |               |
| REDIS_HOST     | Redis Host     |               |
| REDIS_PORT     | Redis Port     | 6385          |
| REDIS_USERNAME | Redis Username | default       |
| REDIS_PASSWORD | Redis Password |               |

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/andreacw5/url-manager-app/releases).

## Author
- [Andrea Tombolato](https://andreatombolato.dev)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

