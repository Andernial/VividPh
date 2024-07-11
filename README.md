# VividPh 📷​🌻

## Tecnologias utilizadas 👾​

react + vite, react router dom lib, react icons, tailwindcss, cloudinary.

## Visão geral ​👀

Projeto desenvolvido como uma rede social onde usuários podem postar fotos artísticas juntamente a músicas!

A responsividade para computador ainda está sendo trabalhada, mas já é utilizável em PCs (o projeto foi desenvolvido com abordagem mobile first).

No momento, não pretendo fazer deploy pois a API foi desenvolvida com MySQL (não tenho uma alternativa gratuita viável para o deploy).

A bibliteca do cloudinary foi utilizada para armazenar e exibir as fotos.

Os links das músicas devem estar nesse formato: "https://www.youtube.com/watch?v=randomnumbers"

O projeto conta também com a biblioteca react-router-dom, que permite a separação de rotas por rotas protegidas e algumas outras funcionalidades.


## Funcionalidades 📱

* Sistema de Autenticação : Baseado em JSON Web Token (JWT), garantindo que apenas usuários autenticados tenham acesso as funcionalidades do site.
* Cadastro de Usuários: Crie uma conta para acessar todas as funcionalidades da plataforma.
* Foto de Perfil: Adicione uma imagem para representar seu perfil.
* Bio: Escreva uma breve descrição sobre você.
* Adicionar Post: Compartilhe fotos junto com suas músicas favoritas.
* Visualizar Posts: Visualize as postagens de outros usuários.
* Perfis de Outros Usuários: Acesse e veja os perfis de outros membros da rede.

  Diversas validações de dados ainda vão ser adicionadas a inputs nas proximas atualizações.


## Para acesar localmente 🏠

Primeiro clone o repositório para o diretório que você deseja salvar utilizando o comando no terminal:
```
git clone "link do repositorio sem as aspas"
```

Depois na pasta raiz do projeto baixe as dependências utilizando do comando: 
```
npm i 
```

Configure o ambiente (crie um arquivo .env na mesma pasta onde esta localizado o arquivo package.json)

*configuração do .env*
```
VITE_CLOUD_NAME = "dbwubryja" //arquivo que contem a chave que indica onde sera salvo as imagens do cloudinary, atualmente essa é minha chave ativa e permito o uso para testes.
VITE_API_URL = "http://localhost:3000" // a url da api sendo utilizada no front
```


para acessar o projeto basta utilizar o comando:

**Este comando gerará um link para o servidor local que basta ser copiado e colado no navegador para ser acessado**
```
npm run dev
```

## Back-End 🔙
Api desenvolvida para o projeto https://github.com/Andernial/VividPh-API/tree/master esta api cuida do gerenciamento de posts e usuários.

O projeto utiliza também a api de iframe do youtube para carregar as músicas https://www.youtube.com/iframe_api

## Resultados
**Home Pc**
![Home-pc](https://github.com/user-attachments/assets/187e9018-4b60-4971-91b8-d0976e4e22a4)

**Modal de criar Post Pc**
![CreatePostModal-pc](https://github.com/user-attachments/assets/0652fcee-609e-43dd-9e88-c270721f27d0)

**Perfil Pc**
![Profile-Pc](https://github.com/user-attachments/assets/2e60f7e3-fe8e-4383-b672-4cb345794831)

**Post Aberto Pc**
![Open-Post](https://github.com/user-attachments/assets/1daa8784-0103-4606-ac7c-eb6a47df46ad)

Créditos das fotos utilizadas nos exemplos: @eros__ser
