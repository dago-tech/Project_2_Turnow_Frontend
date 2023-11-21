# Turnow Project (REACT JS)

Frontend of Turnow Project. A web application that manages turns in different kinds of stablishments, you type your personal ID to the system, take your turn number and wait for the call based on a priority defined by the app admin.

- Creamos el proyecto en react, con
```sh
npm create vite@latest Turnow -- --template react
```

Dentro de la carpeta de proyecto creada damos:

```sh
npm install
npm run dev
```
- Instalamos:

npm install react-router-dom

npm i axios


## Subiendo a Github

1. Creo nuevo Repo en Github o Gitlab
2. Creo repositorio local en mi carpeta local del proyecto
```sh
git init --initial-branch=main
```
3. Hago mi enlace con el repositorio remoto al que quiero subir el proyecto
```sh
git remote add origin https://github.com/dago-tech/Project_2_Turnow_Frontend.git
```
4. Agrego todos los archivos del proyecto al area de stage
```sh
git add .
```
5. Hago commit para enviar mis archivos al repositorio local
```sh
git commit -m "Deploy1"
```
6. Hago push para enviar mi repositorio local al repo remoto
```sh
git push -u origin main
```
- Si obtengo la respuesta:
```
Updates were rejected because the remote contains work that you do
not have locally. This is usually caused by another repository pushing
to the same ref. You may want to first integrate the remote changes
(e.g., 'git pull ...') before pushing again.
See the 'Note about fast-forwards' in 'git push --help' for details.
```
- Este error se debe a que lo que está en el repositorio remoto es diferente a lo del local, así que debo integrarlos. Se recomienta hacer un git pull que traiga el repo remoto hacia el local

- Verifico que el repo remoto sea 'origin' y que me muestre su URL, con:

```sh
git remote
git remote -v
```

- (origin es simplemente el nombre predeterminado que recibe el repositorio remoto principal contra el que trabajamos.)

7. Hago git pull intentando traer lo del repo remoto, en este caso hay error porque los commits del repo local son diferentes a los del repo remoto:
```sh
git pull origin main 
(fatal: refusing to merge unrelated histories)
```
8. Agrego una instruccion adicional a git para permitir historias no relacionadas:
```sh
git pull origin main --allow-unrelated-histories
```
9. Finalmente puedo hacer el push con exito:
```sh
git push origin main
```