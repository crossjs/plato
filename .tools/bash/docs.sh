set -e
echo "Enter message: "
read MESSAGE

echo "Deploying $MESSAGE ..."

# build
npm run build

# commit
cd dist
git init
git add -A
git commit -m "$MESSAGE"
git push -f https://github.com/crossjs/plato.git master:gh-pages

# back to root
cd ..
