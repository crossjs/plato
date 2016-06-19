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
git push -f

# back to root
cd ..
