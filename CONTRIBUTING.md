# Contributing to Airdrop Activity Tracker

First off, thank you for considering contributing to the Airdrop Activity Tracker! It's people like you that make this tool better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to fostering an open and welcoming environment. Please be respectful and constructive.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots if relevant**
- **Include your environment details** (OS, browser, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some other tools or applications where this enhancement exists**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure your code follows the existing style
4. Make sure your code lints without errors
5. Write a clear commit message

## Development Process

### Setting Up Your Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/Airdrop-Activity-Tracker-Cross-Chain-.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. Make your changes
2. Test your changes:
   ```bash
   npm run dev
   ```
3. Ensure code quality:
   ```bash
   npm run lint
   ```
4. Build the project:
   ```bash
   npm run build
   ```

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Examples:
```
Add support for Polygon network
Fix transaction counting bug
Update README with deployment instructions
```

## Style Guidelines

### TypeScript Style Guide

- Use TypeScript for all new files
- Use meaningful variable and function names
- Add comments for complex logic
- Use interfaces over types when possible
- Avoid using `any` type

### React/Next.js Style Guide

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript interfaces for props
- Follow the existing file structure
- Use Tailwind CSS for styling

### File Organization

```
feature/
├── components/          # React components
├── lib/                # Utilities and services
├── types/              # TypeScript definitions
└── config/             # Configuration files
```

## Areas for Contribution

### High Priority

- Improving transaction fetching accuracy
- Adding support for more networks
- Implementing caching mechanisms
- Enhancing mobile responsiveness
- Adding unit and integration tests

### Medium Priority

- Adding new airdrop configurations
- Improving UI/UX
- Adding more detailed analytics
- Performance optimizations
- Documentation improvements

### Good First Issues

Look for issues labeled `good first issue` - these are great for newcomers!

## Adding New Networks

To add support for a new blockchain network:

1. Add network configuration to `config/networks.ts`
2. Add the network to the `Network` enum in `types/index.ts`
3. Update the `BRIDGE_CONTRACTS` if applicable
4. Test thoroughly on the new network
5. Update documentation

## Adding New Airdrop Campaigns

To add a new airdrop campaign:

1. Create a JSON file in `config/airdrops/`
2. Define the criteria and contracts
3. Import it in `config/airdrops/index.ts`
4. Test the requirements checking
5. Update README with new campaign details

## Testing

Currently, the project doesn't have automated tests. Contributing test coverage would be highly valuable!

### Areas That Need Tests

- Address validation
- Transaction counting
- Volume calculation
- Requirement checking
- UI components

## Documentation

- Keep README.md up to date
- Update DEPLOYMENT.md for deployment changes
- Add JSDoc comments to functions
- Document new features

## Questions?

Don't hesitate to ask questions by:
- Opening an issue
- Commenting on existing issues
- Reaching out to maintainers

## Recognition

Contributors will be recognized in the project README.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making airdrop tracking better for everyone!
