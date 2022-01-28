echo
# eslint
echo "eslint client.ts"
if npx eslint client.ts
then
  echo "done"
else
  exit
fi
echo
# transpile typescript
echo "transpiling client.ts"
if tsc
then
  echo "done"
else
  exit
fi
echo
# make client code with servicenow weirdness
echo "making index.html"
cat start.html > index.html
grep -Ev 'use strict|ts-ignore' < client.js | sed 's/    /  /g' | sed 's/^/      /' >> index.html
cat end.html >> index.html
echo "done"
echo
# make upload to vps
echo "uploading"
scp index.html mag:/var/www/html/datacenter_turn
echo "done"
echo