set -e
echo "Enter message: "
read MESSAGE

echo "Deploying ..."

# deploy
MESSAGE=$MESSAGE npm run deploy

# commit
cd dist
git add -A
git commit -m "$MESSAGE"
git push -f

cd ..
