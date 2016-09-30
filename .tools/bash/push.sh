set -e
echo "Enter message: "
read MESSAGE

echo "Pushing $MESSAGE ..."

# run test
npm test

# commit
git add -A
git commit -m "$MESSAGE"

# push
git push
