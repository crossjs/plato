set -e
echo "Enter message: "
read MESSAGE

echo "Deploying ..."

# deploy
npm run deploy

# commit
cd dist
git add -A
git commit -m "$MESSAGE"
git push -f git@github.com:crossjs/plato.git master:gh-pages

# back to root
cd ..
