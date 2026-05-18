# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Support Form / Formspree Integration

The dashboard "Need help" form is prepared for Formspree integration.

To use it:

1. Create a Formspree account and generate a form endpoint.
2. Copy `taskpro-frontend/.env.example` to `taskpro-frontend/.env` if needed.
3. Add your endpoint to `.env`:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

The support form sends:

```json
{
  "email": "user@example.com",
  "comment": "Need help with my board"
}
```

Keep your endpoint out of the repository when possible. Do not commit private environment values you do not want to share.
