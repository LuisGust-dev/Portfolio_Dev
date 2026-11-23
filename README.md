# Portfólio | Luis Gustavo

Portfólio pessoal feito com React, Vite e Three.js (rede de partículas 3D).

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:5173

## Editar o conteúdo

Todo o texto (experiências, projeto, habilidades, contatos) está em `src/data.js`.

Para mostrar o botão "Baixar currículo", coloque o PDF em `public/curriculo.pdf`
e troque `cvUrl: null` por `cvUrl: '/curriculo.pdf'` em `src/data.js`.

## Publicar no Render

1. Suba esta pasta para um repositório no GitHub.
2. No Render, clique em **New > Static Site** e conecte o repositório.
3. Preencha:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Clique em **Create Static Site**.

O arquivo `render.yaml` já tem essa configuração, então também dá para usar
**New > Blueprint** e o Render lê tudo sozinho.
